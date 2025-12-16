import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";
import ImagePicker from "../components/ImagePicker";

const AboutEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().about);
    };
    fetch();
  }, []);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  
  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { about: data });
    setLoading(false);
    alert("✅ About Section Saved!");
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit About Section" onSave={handleSave} loading={loading}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
           <ImagePicker 
             label="Doctor's Profile Photo" 
             currentImage={data.imageUrl}
             onImageSelected={(url) => setData({...data, imageUrl: url})}
           />
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Full Name</span>
            <input name="name" value={data.name} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Designation</span>
            <input name="designation" value={data.designation} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Biography</span>
            <textarea name="bio" value={data.bio} onChange={handleChange} rows={6} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
          </label>
        </div>
      </div>
    </EditorLayout>
  );
};

export default AboutEditor;
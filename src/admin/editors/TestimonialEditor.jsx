import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";
import ImagePicker from "../components/ImagePicker";
import { Icon } from "@iconify/react";

const TestimonialEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().testimonial || { testimonials: [] });
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { testimonial: data });
    setLoading(false);
    alert("✅ Testimonials Saved!");
  };

  // Array Helpers
  const updateItem = (index, field, value) => {
    const newList = [...data.testimonials];
    newList[index][field] = value;
    setData({ ...data, testimonials: newList });
  };

  const addItem = () => {
    const newItem = { name: "Patient Name", text: "Review goes here...", image: "" };
    setData({ ...data, testimonials: [...data.testimonials, newItem] });
  };

  const deleteItem = (index) => {
    if(!confirm("Delete this review?")) return;
    const newList = data.testimonials.filter((_, i) => i !== index);
    setData({ ...data, testimonials: newList });
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Testimonials" onSave={handleSave} loading={loading}>
      <label className="block mb-6">
        <span className="text-gray-700 font-semibold mb-1 block">Section Heading</span>
        <input 
          value={data.heading || ""} 
          onChange={(e) => setData({...data, heading: e.target.value})}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
        />
      </label>

      <div className="grid gap-6">
        {data.testimonials.map((item, index) => (
          <div key={index} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm relative group">
            <button 
              onClick={() => deleteItem(index)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Icon icon="mdi:trash-can" className="text-xl" />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Column */}
              <div className="shrink-0">
                <ImagePicker 
                  label="Patient Photo"
                  currentImage={item.image}
                  onImageSelected={(url) => updateItem(index, 'image', url)}
                />
              </div>

              {/* Text Column */}
              <div className="grow space-y-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Name</span>
                  <input 
                    value={item.name} 
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Review</span>
                  <textarea 
                    value={item.text} 
                    onChange={(e) => updateItem(index, 'text', e.target.value)}
                    rows={3}
                    className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-[#48CEF3] hover:text-[#48CEF3] hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
        <Icon icon="mdi:plus" className="text-2xl" /> Add New Testimonial
      </button>
    </EditorLayout>
  );
};

export default TestimonialEditor;
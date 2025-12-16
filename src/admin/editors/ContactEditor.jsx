import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";

const ContactEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().contact);
    };
    fetch();
  }, []);

  const handleChange = (e) => setData({...data, [e.target.name]: e.target.value});

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { contact: data });
    setLoading(false);
    alert("✅ Contact Info Saved!");
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Contact Info" onSave={handleSave} loading={loading}>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="font-bold text-gray-700">Heading</label>
                <input name="heading" value={data.heading} onChange={handleChange} className="w-full p-3 border rounded-xl bg-gray-50" />
            </div>
            <div>
                <label className="font-bold text-gray-700">Phone</label>
                <input name="phone" value={data.phone} onChange={handleChange} className="w-full p-3 border rounded-xl bg-gray-50" />
            </div>
            <div>
                <label className="font-bold text-gray-700">Email (Visible)</label>
                <input name="dummy_email" value={data.dummy_email} onChange={handleChange} className="w-full p-3 border rounded-xl bg-gray-50" />
            </div>
            <div className="md:col-span-2">
                 <label className="font-bold text-gray-700">Address</label>
                 <textarea name="address" value={data.address} onChange={handleChange} rows={2} className="w-full p-3 border rounded-xl bg-gray-50" />
            </div>
            <div className="md:col-span-2 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                 <label className="font-bold text-yellow-800">Form Submission Email (Backend)</label>
                 <input name="email" value={data.email} onChange={handleChange} className="w-full p-3 border rounded-xl bg-white mt-1" />
                 <p className="text-xs text-yellow-700 mt-1">This is where patient messages will be sent.</p>
            </div>
        </div>
    </EditorLayout>
  );
};

export default ContactEditor;
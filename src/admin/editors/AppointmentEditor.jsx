import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";

const AppointmentEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().appointment);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { appointment: data });
    setLoading(false);
    alert("✅ Appointment Banner Saved!");
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Appointment Banner" onSave={handleSave} loading={loading}>
        <label className="block">
            <span className="font-bold text-gray-700">Heading</span>
            <input value={data.heading} onChange={e => setData({...data, heading: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50" />
        </label>
        <label className="block mt-4">
            <span className="font-bold text-gray-700">Sub Heading</span>
            <input value={data.sub_heading} onChange={e => setData({...data, sub_heading: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50" />
        </label>
    </EditorLayout>
  );
};

export default AppointmentEditor;
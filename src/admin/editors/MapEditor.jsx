import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";

const MapEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().map);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { map: data });
    setLoading(false);
    alert("✅ Map Saved!");
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Map" onSave={handleSave} loading={loading}>
        <label className="block mt-4">
            <span className="font-bold text-gray-700">Google Map Embed URL (src)</span>
            <textarea 
                value={data.map_url || data.src} // Handle potential naming differences
                onChange={e => setData({...data, map_url: e.target.value})} 
                rows={4} 
                className="w-full p-3 border rounded-xl bg-gray-50 font-mono text-sm" 
            />
            <p className="text-xs text-gray-400 mt-1">Paste the 'src' link from Google Maps Embed code here.</p>
        </label>
    </EditorLayout>
  );
};

export default MapEditor;
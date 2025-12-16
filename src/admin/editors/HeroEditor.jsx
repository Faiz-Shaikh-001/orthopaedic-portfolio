import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";

const HeroEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "website_content", "homepage");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setData(snap.data().hero);
      }
    };
    fetchData();
  }, []);

  // 2. Handle Text Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Handle Nested Stats Change
  const handleStatChange = (key, value) => {
    setData(prev => ({
      ...prev,
      stats: { ...prev.stats, [key]: Number(value) } // Ensure it's a number
    }));
  };

  // 4. Save to Firebase
  const handleSave = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "website_content", "homepage");
      await updateDoc(docRef, { hero: data });
      alert("✅ Hero Section Updated!");
    } catch (err) {
      console.error(err);
      alert("❌ Error saving data");
    }
    setLoading(false);
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Hero Section" onSave={handleSave} loading={loading}>
      
      {/* Main Text Fields */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Main Title</span>
          <input 
            name="title" 
            value={data.title} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48CEF3] outline-none transition-all"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-1 block">Subtitle / Bio</span>
          <textarea 
            name="subtext" 
            value={data.subtext} 
            onChange={handleChange} 
            rows={5}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48CEF3] outline-none transition-all"
          />
          <p className="text-xs text-gray-400 mt-1">Tip: Use &lt;br/&gt; to create new lines.</p>
        </label>
      </div>

      {/* Stats Section */}
      <div className="pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-[#0E5B81] mb-4">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(data.stats || {}).map(([key, val]) => (
            <label key={key} className="block">
              <span className="text-sm font-semibold text-gray-600 capitalize">{key}</span>
              <input 
                type="number" 
                value={val} 
                onChange={(e) => handleStatChange(key, e.target.value)} 
                className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none"
              />
            </label>
          ))}
        </div>
      </div>

    </EditorLayout>
  );
};

export default HeroEditor;
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";
import { Icon } from "@iconify/react";

const WhyUsEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().why_us);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { why_us: data });
    setLoading(false);
    alert("✅ Why Us Section Saved!");
  };

  // --- Bullet Points Logic ---
  const updateBullet = (index, val) => {
    const newBullets = [...data.bullets];
    newBullets[index] = val;
    setData({ ...data, bullets: newBullets });
  };
  const addBullet = () => setData({ ...data, bullets: [...data.bullets, "New Point"] });
  const removeBullet = (index) => {
    const newBullets = data.bullets.filter((_, i) => i !== index);
    setData({ ...data, bullets: newBullets });
  };

  // --- Benefits Logic ---
  const updateBenefit = (index, field, val) => {
    const newBenefits = [...data.benefits_list];
    newBenefits[index][field] = val;
    setData({ ...data, benefits_list: newBenefits });
  };
  const addBenefit = () => {
    const newItem = { title: "New Benefit", description: "Desc...", icon_key: "smile" };
    setData({ ...data, benefits_list: [...data.benefits_list, newItem] });
  };
  const removeBenefit = (index) => {
    const newBenefits = data.benefits_list.filter((_, i) => i !== index);
    setData({ ...data, benefits_list: newBenefits });
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Why Us Section" onSave={handleSave} loading={loading}>
      <div className="space-y-4">
        <label className="block">
            <span className="font-bold text-gray-700">Heading</span>
            <input value={data.heading} onChange={e => setData({...data, heading: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50" />
        </label>
        <label className="block">
            <span className="font-bold text-gray-700">Sub Heading</span>
            <input value={data.sub_heading} onChange={e => setData({...data, sub_heading: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50" />
        </label>
        <label className="block">
            <span className="font-bold text-gray-700">Intro Text</span>
            <textarea value={data.intro_text} onChange={e => setData({...data, intro_text: e.target.value})} rows={3} className="w-full p-3 border rounded-xl bg-gray-50" />
        </label>
      </div>

      <hr className="border-gray-100 my-8" />

      {/* Bullet Points */}
      <div>
        <h3 className="font-bold text-[#0E5B81] mb-4 text-lg">Bullet Points</h3>
        <div className="space-y-3">
            {data.bullets.map((bullet, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <Icon icon="mdi:circle-small" className="text-gray-400 text-2xl" />
                    <input 
                        value={bullet} 
                        onChange={e => updateBullet(i, e.target.value)} 
                        className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-[#48CEF3]" 
                    />
                    <button onClick={() => removeBullet(i)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Icon icon="mdi:trash-can" className="text-xl" /></button>
                </div>
            ))}
        </div>
        <button onClick={addBullet} className="text-sm font-bold text-[#0E5B81] flex items-center gap-2 mt-4 px-2 py-1 hover:bg-blue-50 rounded-lg transition-colors"><Icon icon="mdi:plus-circle" className="text-xl"/> Add Bullet Point</button>
      </div>

      <hr className="border-gray-100 my-8" />

      {/* Benefits Cards (Updated Design) */}
      <div>
        <h3 className="font-bold text-[#0E5B81] mb-4 text-lg">Benefits Cards</h3>
        <div className="grid gap-6">
            {data.benefits_list.map((item, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white transition-colors group relative shadow-sm hover:shadow-md">
                    
                    {/* Delete Button */}
                    <button 
                        onClick={() => removeBenefit(i)} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors"
                        title="Delete Card"
                    >
                        <Icon icon="mdi:trash-can-outline" className="text-xl" />
                    </button>

                    <div className="grid md:grid-cols-2 gap-5 pr-12">
                        <label>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Title</span>
                            <input 
                                value={item.title} 
                                onChange={e => updateBenefit(i, 'title', e.target.value)} 
                                className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow" 
                                placeholder="Title" 
                            />
                        </label>
                        
                        <label>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Icon Key</span>
                            <input 
                                value={item.icon_key} 
                                onChange={e => updateBenefit(i, 'icon_key', e.target.value)} 
                                className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow" 
                                placeholder="e.g. smile, support" 
                            />
                        </label>
                        
                        <label className="md:col-span-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description</span>
                            <textarea 
                                value={item.description} 
                                onChange={e => updateBenefit(i, 'description', e.target.value)} 
                                rows={2} 
                                className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow" 
                                placeholder="Benefit description..." 
                            />
                        </label>
                    </div>
                </div>
            ))}
        </div>
        
        <button 
            onClick={addBenefit} 
            className="w-full py-4 mt-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-[#48CEF3] hover:text-[#48CEF3] hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
        >
            <Icon icon="mdi:plus" className="text-2xl" /> Add New Benefit Card
        </button>
      </div>
    </EditorLayout>
  );
};

export default WhyUsEditor;
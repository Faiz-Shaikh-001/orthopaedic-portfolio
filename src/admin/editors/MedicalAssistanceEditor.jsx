import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";
import { Icon } from "@iconify/react";

const MedicalAssistanceEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().medicalAssistance);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { medicalAssistance: data });
    setLoading(false);
    alert("✅ Saved!");
  };

  const updateCard = (index, field, val) => {
    const newCards = [...data.cards];
    newCards[index][field] = val;
    setData({ ...data, cards: newCards });
  };

  const addCard = () => {
      setData({...data, cards: [...data.cards, { title: "New", content: "...", icon_name: "mdi:heart", variant: "default", cta_text: "Read More" }]})
  };

  const removeCard = (index) => {
      if(!confirm("Delete this card?")) return;
      const newCards = data.cards.filter((_, i) => i !== index);
      setData({...data, cards: newCards});
  }

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Medical Assistance" onSave={handleSave} loading={loading}>
        
        <label className="block mb-8">
            <span className="text-gray-700 font-semibold mb-2 block">Section Heading</span>
            <input 
                value={data.heading} 
                onChange={e => setData({...data, heading: e.target.value})} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48CEF3] outline-none transition-all" 
            />
        </label>

        <div className="space-y-6">
            {data.cards.map((card, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white transition-colors group relative shadow-sm hover:shadow-md">
                     
                     {/* Delete Button */}
                     <button 
                        onClick={() => removeCard(i)} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors"
                        title="Delete Card"
                     >
                        <Icon icon="mdi:trash-can-outline" className="text-xl" />
                     </button>

                     <div className="grid gap-5 md:grid-cols-2 pr-12">
                        <label>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Title</span>
                            <input 
                                value={card.title} 
                                onChange={e => updateCard(i, 'title', e.target.value)} 
                                className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow" 
                            />
                        </label>
                        
                        <label>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Icon Name (Iconify)</span>
                            <div className="relative">
                                <input 
                                    value={card.icon_name} 
                                    onChange={e => updateCard(i, 'icon_name', e.target.value)} 
                                    className="w-full mt-1 p-2.5 pl-9 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow" 
                                />
                                <Icon icon={card.icon_name} className="absolute left-3 top-4 text-gray-400 text-lg" />
                            </div>
                        </label>
                        
                        <label>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Color Variant</span>
                            <select 
                                value={card.variant} 
                                onChange={e => updateCard(i, 'variant', e.target.value)} 
                                className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow"
                            >
                                <option value="default">Default (White)</option>
                                <option value="dark">Dark (Blue)</option>
                                <option value="accent">Accent (Light Blue)</option>
                            </select>
                        </label>
                        
                        <label>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">CTA Text</span>
                            <input 
                                value={card.cta_text} 
                                onChange={e => updateCard(i, 'cta_text', e.target.value)} 
                                className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow" 
                            />
                        </label>
                        
                        <label className="md:col-span-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Content</span>
                            <textarea 
                                value={card.content} 
                                onChange={e => updateCard(i, 'content', e.target.value)} 
                                rows={2} 
                                className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow" 
                            />
                        </label>
                     </div>
                </div>
            ))}
        </div>
        
        <button 
            onClick={addCard} 
            className="w-full py-4 mt-6 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-[#0E5B81] hover:border-[#0E5B81] hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
        >
            <Icon icon="mdi:plus" className="text-2xl" /> Add New Card
        </button>
    </EditorLayout>
  );
};

export default MedicalAssistanceEditor;
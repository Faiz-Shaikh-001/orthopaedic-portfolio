import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";
import { Icon } from "@iconify/react";

const AchievementsEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().achievement); 
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { achievment: data });
    setLoading(false);
    alert("✅ Achievements Saved!");
  };

  const updateCard = (index, field, val) => {
    const newCards = [...data.cards];
    newCards[index][field] = val;
    setData({ ...data, cards: newCards });
  };
  
  const updateSubText = (val) => {
      const arr = val.split(",").map(s => s.trim());
      setData({...data, sub_text: arr});
  }

  const addCard = () => {
    setData({
        ...data, 
        cards: [...data.cards, { title: "100+", content: "New Stat", icon_name: "mdi:star", variant: "default" }]
    });
  };

  const removeCard = (index) => {
    if(!confirm("Delete this achievement card?")) return;
    const newCards = data.cards.filter((_, i) => i !== index);
    setData({...data, cards: newCards});
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit Achievements" onSave={handleSave} loading={loading}>
        <div className="space-y-6 mb-10">
            <label className="block">
                <span className="text-gray-700 font-semibold mb-2 block">Section Heading</span>
                <input 
                    value={data.heading} 
                    onChange={e => setData({...data, heading: e.target.value})} 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48CEF3] outline-none transition-all" 
                />
            </label>
            <label className="block">
                <span className="text-gray-700 font-semibold mb-2 block">Typewriter Text (Comma separated)</span>
                <input 
                    value={Array.isArray(data.sub_text) ? data.sub_text.join(", ") : data.sub_text} 
                    onChange={e => updateSubText(e.target.value)} 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48CEF3] outline-none transition-all" 
                />
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Icon icon="mdi:information-outline" /> 
                    Example: "25+ Years Experience, 12000+ Happy Patients"
                </p>
            </label>
        </div>

        <hr className="border-gray-100 my-8" />

        {/* Achievement Cards */}
        <div>
            <h3 className="font-bold text-[#0E5B81] mb-6 text-lg">Achievement Cards</h3>
            <div className="grid gap-6">
                {data.cards && data.cards.map((card, i) => (
                    <div key={i} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white transition-colors group relative shadow-sm hover:shadow-md">
                        
                        {/* Delete Button */}
                        <button 
                            onClick={() => removeCard(i)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors"
                            title="Delete Card"
                        >
                            <Icon icon="mdi:trash-can-outline" className="text-xl" />
                        </button>

                        <div className="grid md:grid-cols-2 gap-5 pr-12">
                            <label>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Big Number / Title</span>
                                <input 
                                    value={card.title} 
                                    onChange={e => updateCard(i, 'title', e.target.value)} 
                                    placeholder="e.g. 25+" 
                                    className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow"
                                />
                            </label>

                            <label>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Label / Content</span>
                                <input 
                                    value={card.content} 
                                    onChange={e => updateCard(i, 'content', e.target.value)} 
                                    placeholder="e.g. Years Exp" 
                                    className="w-full mt-1 p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#48CEF3] outline-none transition-shadow"
                                />
                            </label>

                            <label>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Icon Name</span>
                                <div className="relative">
                                    <input 
                                        value={card.icon_name} 
                                        onChange={e => updateCard(i, 'icon_name', e.target.value)} 
                                        placeholder="Icon Name" 
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
                                    <option value="default">Default</option>
                                    <option value="dark">Dark</option>
                                    <option value="accent">Accent</option>
                                </select>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={addCard} 
                className="w-full py-4 mt-6 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-[#0E5B81] hover:border-[#0E5B81] hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
                <Icon icon="mdi:plus" className="text-2xl" /> Add Achievement Stat
            </button>
        </div>
    </EditorLayout>
  );
};

export default AchievementsEditor;
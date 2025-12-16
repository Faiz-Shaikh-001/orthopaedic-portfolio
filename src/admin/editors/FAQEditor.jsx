import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorLayout from "../components/EditorLayout";
import { Icon } from "@iconify/react";

const FAQEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "website_content", "homepage"));
      if (snap.exists()) setData(snap.data().faq || { faqs: [] });
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "website_content", "homepage"), { faq: data });
    setLoading(false);
    alert("✅ FAQs Saved!");
  };

  const updateItem = (index, field, value) => {
    const newList = [...data.faqs];
    newList[index][field] = value;
    setData({ ...data, faqs: newList });
  };

  const addItem = () => setData({ ...data, faqs: [...data.faqs, { question: "New Question?", answer: "Answer here." }] });
  
  const deleteItem = (index) => {
    const newList = data.faqs.filter((_, i) => i !== index);
    setData({ ...data, faqs: newList });
  };

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <EditorLayout title="Edit FAQs" onSave={handleSave} loading={loading}>
      <label className="block mb-6">
        <span className="text-gray-700 font-semibold mb-1 block">Heading</span>
        <input value={data.heading || ""} onChange={(e) => setData({...data, heading: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
      </label>

      <div className="space-y-4">
        {data.faqs.map((item, index) => (
          <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/30">
            <div className="grow space-y-2">
              <input 
                value={item.question} 
                onChange={(e) => updateItem(index, 'question', e.target.value)}
                placeholder="Question"
                className="w-full p-2 font-bold bg-transparent border-b border-gray-200 focus:border-[#48CEF3] outline-none"
              />
              <textarea 
                value={item.answer} 
                onChange={(e) => updateItem(index, 'answer', e.target.value)}
                placeholder="Answer"
                rows={2}
                className="w-full p-2 bg-transparent outline-none text-sm text-gray-600"
              />
            </div>
            <button onClick={() => deleteItem(index)} className="text-gray-400 hover:text-red-500 self-start p-2"><Icon icon="mdi:close" /></button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="text-[#0E5B81] font-bold text-sm flex items-center gap-1 hover:underline mt-2"><Icon icon="mdi:plus" /> Add Question</button>
    </EditorLayout>
  );
};

export default FAQEditor;
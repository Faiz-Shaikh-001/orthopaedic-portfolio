import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const EditorLayout = ({ title, onSave, loading, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto pb-20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-50/80 backdrop-blur-md py-4 z-20 border-b border-gray-200">
        <h1 className="text-3xl font-[battambang] font-bold text-[#0E5B81]">{title}</h1>
        
        <button 
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0E5B81] hover:bg-[#0b4a6b] text-white rounded-full font-bold shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Icon icon="eos-icons:loading" className="text-xl" />
          ) : (
            <Icon icon="mdi:content-save" className="text-xl" />
          )}
          <span>{loading ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {children}
      </div>
    </motion.div>
  );
};

export default EditorLayout;
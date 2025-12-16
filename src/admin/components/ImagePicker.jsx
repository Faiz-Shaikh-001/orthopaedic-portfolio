import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Icon } from "@iconify/react";

const ImagePicker = ({ label, currentImage, onImageSelected }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const storage = getStorage();
      // Create a unique filename
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      onImageSelected(url); // Send URL back to parent
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-bold text-gray-500 uppercase">{label}</span>
      
      <div className="flex items-center gap-4">
        {/* Preview Circle */}
        <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
          {currentImage ? (
            <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Icon icon="mdi:image" className="text-2xl" />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <div className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
            uploading 
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-wait"
              : "bg-white text-[#0E5B81] border-[#0E5B81] hover:bg-blue-50"
          }`}>
            {uploading ? "Uploading..." : "Change Photo"}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImagePicker;
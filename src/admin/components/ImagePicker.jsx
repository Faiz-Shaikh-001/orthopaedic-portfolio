import {
  useRef,
  useState,
} from "react";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import {
  Icon,
} from "@iconify/react";

import {
  storage,
} from "../../firebase";


const MAX_FILE_SIZE =
  5 * 1024 * 1024;


const ALLOWED_IMAGE_TYPES =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ]);


const EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};


const ImagePicker = ({
  label,
  currentImage,
  onImageSelected,
}) => {
  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    uploadError,
    setUploadError,
  ] = useState("");

  const inputRef =
    useRef(null);


  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };


  const validateFile = (file) => {
    if (
      !ALLOWED_IMAGE_TYPES.has(
        file.type
      )
    ) {
      return (
        "Please select a JPG, PNG, WebP, or GIF image."
      );
    }


    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      return (
        "Image must be smaller than 5 MB."
      );
    }


    return null;
  };


  const handleUpload = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }


    setUploadError("");


    const validationError =
      validateFile(file);


    if (validationError) {
      setUploadError(
        validationError
      );

      resetInput();

      return;
    }


    setUploading(true);


    try {
      const extension =
        EXTENSIONS[file.type];

      const fileId =
        crypto.randomUUID();

      const storagePath =
        `images/${fileId}.${extension}`;


      const storageRef =
        ref(
          storage,
          storagePath
        );


      await uploadBytes(
        storageRef,
        file,
        {
          contentType:
            file.type,
        }
      );


      const downloadUrl =
        await getDownloadURL(
          storageRef
        );


      onImageSelected(
        downloadUrl
      );

    } catch (error) {
      console.error(
        "Image upload failed:",
        error
      );

      setUploadError(
        "Unable to upload the image. Please try again."
      );

    } finally {
      setUploading(false);

      resetInput();
    }
  };


  return (
    <div className="space-y-2">

      <span className="text-xs font-bold text-gray-500 uppercase">
        {label}
      </span>


      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0">

          {currentImage ? (
            <img
              src={currentImage}
              alt={`${label} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">

              <Icon
                icon="mdi:image"
                className="text-2xl"
              />

            </div>
          )}

        </div>


        <label
          className={
            uploading
              ? "cursor-wait"
              : "cursor-pointer"
          }
        >

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
            onChange={
              handleUpload
            }
            disabled={
              uploading
            }
            className="hidden"
          />


          <div
            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
              uploading
                ? "bg-gray-100 text-gray-400 border-gray-200"
                : "bg-white text-[#0E5B81] border-[#0E5B81] hover:bg-blue-50"
            }`}
          >

            {uploading
              ? "Uploading..."
              : "Change Photo"}

          </div>

        </label>

      </div>


      {uploadError && (
        <p
          role="alert"
          className="text-sm text-red-600"
        >
          {uploadError}
        </p>
      )}

    </div>
  );
};


export default ImagePicker;
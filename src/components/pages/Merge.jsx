import { useState } from "react";
import MergedImage from "../photo-editor/MergedImage";
import PasteBoard from "../photo-editor/PasteBoard";
export default function Merge() {
  const [image, setImage] = useState(null);
  const handlePaste = (e) => {
    try {
      const items = e.clipboardData.items;
      const blob = items[0].getAsFile();
      var URLObj = window.URL || window.webkitURL;
      var source = URLObj.createObjectURL(blob);
      setImage(source);
      
    } catch (e) {
    }
  };
  return (
    <>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Photo Grid Maker
      </h2>
      <div className="flex flex-col gap-3 mx-auto mt-4">
        
        {image ? (
          <MergedImage image={image} />
        ) : (
          <PasteBoard handlePaste={handlePaste} />
        )}
      </div>
    </>
  );
}

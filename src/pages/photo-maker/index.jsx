import { useState } from "react";
import MergedImage from "./components/MergedImage";
import PasteBoard from "./components/PasteBoard";
import SizeSelect from "./components/SizeSelect";
export default function Merge() {
  const [image, setImage] = useState(null);
  const [photoSize, setPhotoSize] = useState(0);
  const handlePaste = (e) => {
    try {
      const items = e.clipboardData.items;
      const blob = items[0].getAsFile();
      var URLObj = window.URL || window.webkitURL;
      var source = URLObj.createObjectURL(blob);
      setImage(source);
    } catch (e) {}
  };
  return (
    <>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Photo Maker
      </h2>
      <div className="grid grid-cols-12 gap-4 mt-4">
        {image ? (
          <>
            <SizeSelect onChange={setPhotoSize} />
            <MergedImage image={image} key={image + photoSize} size={photoSize} />
          </>
        ) : (
          <PasteBoard handlePaste={handlePaste} />
        )}
      </div>
    </>
  );
}

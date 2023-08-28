import { useState } from "react";
import { pp12_merger } from "../../utilities/pp12";
import MergeError from "../photo-editor/Error";
import MergedImage from "../photo-editor/MergedImage";
import PasteBoard from "../photo-editor/PasteBoard";
export default function PP12() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const handlePaste = (e) => {
    try {
      const items = e.clipboardData.items;
      const blob = items[0].getAsFile();
      var URLObj = window.URL || window.webkitURL;
      var source = URLObj.createObjectURL(blob);
      pp12_merger(source)
        .then((canvasUrl) => {
          setImage(canvasUrl);
          setError(null);
        })
        .catch((e) => {
          setError(e);
        });
    } catch (e) {
      setError("Failed to merge. Copy image to clipboard before pasting");
    }
  };
  return (
    <>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Passport 12
      </h2>
      <div className="flex flex-col gap-3 mx-auto mt-4">
        {error ? <MergeError message={error} /> : null}
        {image ? (
          <MergedImage image={image} />
        ) : (
          <PasteBoard handlePaste={handlePaste} />
        )}
      </div>
    </>
  );
}

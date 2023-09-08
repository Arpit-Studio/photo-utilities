import { saveAs } from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { HiArrowLeft, HiDocumentDownload, HiDownload } from "react-icons/hi";
import imageMerge from "../../../utilities/imageMerge";
import useFiles from "../provider/Files";

export default function MergeResult() {
  const { files, setScreen } = useFiles();
  const [mergedImages, setMergedImages] = useState([]);
  const [padding, setPadding] = useState(100);
  const [gap, setGap] = useState(20);
  const [dpi, setDPI] = useState(100);
  useEffect(
    function () {
      const timeout = setTimeout(() => {
        imageMerge(files, dpi, padding, gap)
          .then((arr) => {
            setMergedImages(arr);
          })
          .catch((err) => console.log(err));
      }, 500);
      return () => clearTimeout(timeout);
    },
    [dpi, files, gap, padding],
  );
  const downloadAllFiles = useCallback(() => {
    mergedImages.length > 0 &&
      mergedImages.forEach((img, index) => {
        saveAs(img, `merged_${index + 1}.jpg`);
      });
  }, [mergedImages]);
  return (
    <>
      <div className="grid grid-cols-3 my-5 items-center">
        <div className="flex flex-row items-center gap-5">
          <button
            type="button"
            className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-gray-800 flex flex-row items-center gap-3"
            onClick={(e) => setScreen("upload")}>
            <HiArrowLeft /> Back
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <div>
            <label>DPI - {dpi}</label>
            <input
              type="range"
              step="1"
              min="50"
              max="500"
              onChange={(e) => setDPI(e.target.value)}
              value={dpi}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
            />
          </div>
          <div>
            <label>Edge Gutter - {padding}</label>
            <input
              type="range"
              step="1"
              min="0"
              max="300"
              onChange={(e) => setPadding(e.target.value)}
              value={padding}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
            />
          </div>
          <div>
            <label>Spacing - {gap}</label>
            <input
              type="range"
              step="1"
              min="0"
              max="200"
              onChange={(e) => setGap(e.target.value)}
              value={gap}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 flex flex-row items-center gap-3"
            onClick={downloadAllFiles}>
            Download Files <HiDocumentDownload />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {mergedImages.map((img, index) => (
          <div
            className="relative border border-solid border-black p-2 flex items-center justify-center shadow-inner shadow-black group"
            key={index}>
            <img src={img} key={index} alt={`Merged Images - ${index + 1}`} />
            <a
              href={img}
              download={`merged_${index + 1}.jpg`}
              className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white p-2 rounded-md bg-black bg-opacity-50 group-hover:opacity-100 opacity-0 transition-opacity hover:bg-opacity-80">
              <HiDownload className="w-8 h-8" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

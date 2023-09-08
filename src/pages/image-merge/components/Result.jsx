import { saveAs } from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { HiArrowLeft, HiDocumentDownload, HiDownload } from "react-icons/hi";
import imageMerge from "../../../utilities/imageMerge";
import useFiles from "../provider/Files";

export default function MergeResult() {
  const { files, setScreen } = useFiles();
  const [mergedImages, setMergedImages] = useState([]);
  useEffect(
    function () {
      imageMerge(files)
        .then((arr) => {
          setMergedImages(arr);
        })
        .catch((err) => {});
    },
    [files],
  );
  const downloadAllFiles = useCallback(() => {
    mergedImages.length > 0 &&
      mergedImages.forEach((img, index) => {
        saveAs(img, `merged_${index + 1}.jpg`);
      });
  }, [mergedImages]);
  return (
    <>
      <div className="grid grid-cols-2 my-5">
        <div>
          <button
            type="button"
            className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-gray-800 flex flex-row items-center gap-3"
            onClick={(e) => setScreen("upload")}>
            <HiArrowLeft /> Back
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex flex-row items-center gap-3"
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

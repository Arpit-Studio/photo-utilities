import clsx from "clsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineFileImage, AiOutlineFilePdf } from "react-icons/ai";
import { HiArrowLeft, HiDownload } from "react-icons/hi";
import {
  MdVerticalAlignBottom,
  MdVerticalAlignCenter,
  MdVerticalAlignTop,
} from "react-icons/md";
import Loading from "../../../components/Loading";
import imageMerge from "../../../utilities/imageMerge";
import useFiles from "../provider/Files";

export default function MergeResult() {
  const { files, setScreen } = useFiles();
  const [loading, setLoading] = useState(true);
  const [mergedImages, setMergedImages] = useState([]);
  const [dpi, setDPI] = useState(300);
  const [padding, setPadding] = useState(300);
  const [gap, setGap] = useState(50);
  const [align, setAlign] = useState("center");
  const [per_page, setPerPage] = useState(2);
  useEffect(
    function () {
      setLoading(true);
      const timeout = setTimeout(() => {
        imageMerge(
          files,
          parseInt(dpi),
          parseInt(padding),
          parseInt(gap),
          align,
          parseInt(per_page),
        )
          .then((arr) => {
            setMergedImages(arr);
            setLoading(false);
          })
          .catch((err) => {});
      }, 100);
      return () => clearTimeout(timeout);
    },
    [align, dpi, files, gap, padding, per_page],
  );
  const downloadAllFiles = useCallback(() => {
    mergedImages.length > 0 &&
      mergedImages.forEach((img, index) => {
        saveAs(img, `merged_${index + 1}.jpg`);
      });
  }, [mergedImages]);
  const downloadPDF = useCallback(() => {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    if (mergedImages.length > 0) {
      mergedImages.forEach((img, index) => {
        if (index > 0) {
          doc.addPage();
        }
        doc.addImage(img, "JPEG", 0, 0, width, height);
      });
      doc.save("merged.pdf");
    }
  }, [mergedImages]);
  return (
    <>
      <div className="flex flex-row gap-5 my-5 items-center">
        <div className="flex flex-row items-center gap-5">
          <button
            type="button"
            className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-600 hover:bg-gray-700 focus:outline-none  flex flex-row items-center gap-3"
            onClick={(e) => setScreen("upload")}>
            <HiArrowLeft /> Back
          </button>
        </div>
        <div className="flex flex-row gap-5 flex-1 items-center  whitespace-nowrap">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={(e) => setAlign("top")}
              className={clsx([
                "inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-l-lg focus:z-10   border-gray-600 text-white hover:text-white hover:bg-gray-600  focus:text-white",
                align === "top" ? "bg-gray-600" : "bg-gray-700",
              ])}>
              <MdVerticalAlignTop className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => setAlign("center")}
              className={clsx([
                "inline-flex items-center px-4 py-2 text-sm font-medium focus:z-10   border-gray-600 text-white hover:text-white hover:bg-gray-600  focus:text-white",
                align === "center" ? "bg-gray-600" : "bg-gray-700",
              ])}>
              <MdVerticalAlignCenter className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => setAlign("bottom")}
              className={clsx([
                "inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10   border-gray-600 text-white hover:text-white hover:bg-gray-600  focus:text-white",
                align === "bottom" ? "bg-gray-600" : "bg-gray-700",
              ])}>
              <MdVerticalAlignBottom className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <label>Per Page</label>
            <input
              type="number"
              step={1}
              min={1}
              max={4}
              onChange={(e) => setPerPage(e.target.value)}
              value={per_page}
              className="border-none text-sm rounded-lg  block w-24 px-4 py-2.5 bg-gray-700 placeholder-gray-400 text-white"
            />
            
          </div>
          <div className="flex gap-2 items-center">
            <label>DPI</label>
            <input
              type="number"
              step={50}
              min={100}
              max={300}
              onChange={(e) => setDPI(e.target.value)}
              value={dpi}
              className="border-none text-sm rounded-lg  block w-24 px-4 py-2.5 bg-gray-700 placeholder-gray-400 text-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label>Edge</label>
            <input
              type="number"
              step={1}
              min={0}
              //max={1000}
              onChange={(e) => setPadding(e.target.value)}
              value={padding}
              className="border-none text-sm rounded-lg  block w-24 px-4 py-2.5 bg-gray-700 placeholder-gray-400 text-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label>Gap</label>
            <input
              type="number"
              step={1}
              min={0}
              //max={200}
              onChange={(e) => setGap(e.target.value)}
              value={gap}
              className="border-none text-sm rounded-lg  block w-24 px-4 py-2.5 bg-gray-700 placeholder-gray-400 text-white"
            />
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <button
            type="button"
            className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none flex flex-row items-center gap-3"
            onClick={downloadPDF}>
            Download PDF <AiOutlineFilePdf className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none flex flex-row items-center gap-3"
            onClick={downloadAllFiles}>
            Download JPGs <AiOutlineFileImage className="w-5 h-5" />
          </button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
}

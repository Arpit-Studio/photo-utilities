import { HiArrowLeft, HiDocumentDownload } from "react-icons/hi";
import useFiles from "../provider/Files";

export default function MergeResult() {
  const { setScreen } = useFiles();
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex flex-row items-center gap-3">
            Download Files <HiDocumentDownload />
          </button>
        </div>
      </div>
      <div>TODO: Put all the selected images 2 per page in standard A4 size of 300 DPI and let download files individually or in bulk</div>
    </>
  );
}

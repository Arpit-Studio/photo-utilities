import { useDrop } from "react-dnd";
import useFiles from "../provider/Files";
import Image from "./Image";

export default function FilesPreview() {
  const { files, setScreen, clearFiles } = useFiles();
  const [, drop] = useDrop(() => ({ accept: "image_file" }));
  return (
    <>
      {files.length > 0 ? (
        <>
          <div className="flex flex-row items-center justify-center my-5 gap-5">
            <button
              type="button"
              className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none "
              onClick={(e) => setScreen("result")}>
              Generate
            </button>
            <button
              type="button"
              className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-600 hover:bg-gray-700 focus:outline-none"
              onClick={(e) => clearFiles("result")}>
              Clear Image
            </button>
          </div>
          <div className="grid gap-4 grid-cols-6 my-5" ref={drop}>
            {files.map(({ id, name, url }, index) => (
              <Image url={url} id={id} name={name} key={id} index={index} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

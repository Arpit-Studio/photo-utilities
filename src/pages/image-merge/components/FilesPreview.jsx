import { useDrop } from "react-dnd";
import useFiles from "../provider/Files";
import Image from "./Image";

export default function FilesPreview() {
  const { files,setScreen } = useFiles();
  const [, drop] = useDrop(() => ({ accept: "image_file" }));
  return (
    <>
      {files.length > 0 ? (
        <>
          <div className="flex flex-row items-center justify-center my-5">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={e=>setScreen("result")}>
              Generate
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
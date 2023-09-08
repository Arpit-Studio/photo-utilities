import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { HiTrash } from "react-icons/hi";
import useFiles from "../provider/Files";

export default function Image({ id, name, url }) {
  const { setFiles, moveFile, findFile, removeFile } = useFiles();
  const originalIndex = findFile(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "image_file",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          setFiles(moveFile(droppedId, originalIndex));
        }
      },
    }),
    [id, originalIndex, moveFile, setFiles],
  );
  const [, drop] = useDrop(
    () => ({
      accept: "image_file",
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findFile(id);
          setFiles(moveFile(draggedId, overIndex));
        }
      },
    }),
    [findFile, moveFile, setFiles],
  );
  return (
    <div
      ref={(node) => drag(drop(node))}
      className={clsx(
        "relative border border-solid border-black p-2 flex items-center justify-center shadow-inner shadow-black transition-all cursor-move group",
        isDragging ? "opacity-5" : "opacity-100",
      )}>
      <img
        src={url}
        alt={name}
        className="aspect-square object-cover object-center"
      />
      <h3 className="absolute left-0 bottom-0 p-2 text-xs font-medium bg-gray-700 text-white bg-opacity-80 uppercase w-full text-center break-words">
        {name}
      </h3>
      <div className="absolute right-3 top-3 bg-black bg-opacity-60 p-1 rounded-md cursor-pointer hidden group-hover:block">
        <HiTrash
          onClick={(e) =>
            window.confirm(`Do you want to remove ${name}?`) && removeFile(id)
          }
          className="w-5 h-5 text-red-500 hover:text-red-600"
        />
      </div>
    </div>
  );
}

import update from "immutability-helper";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import uuid from "../../../utilities/uuid";
import { FilesContext } from "./Files";

export default function FilesProvider({ children }) {
  const [files, setFileItems] = useState([]);
  const [screen, setScreen] = useState("uploader");
  const findFile = useCallback(
    (id) => {
      const file = files.filter((c) => c.id === id)[0];
      return {
        file,
        index: files.indexOf(file),
      };
    },
    [files],
  );
  const clearFiles=useCallback(()=>{
    setFileItems([]);
  },[setFileItems])
  const moveFile = useCallback(
    (id, atIndex) => {
      const { file, index } = findFile(id);

      return update(files, {
        $splice: [
          [index, 1],
          [atIndex, 0, file],
        ],
      });
    },
    [files, findFile],
  );
  const setFiles = useCallback((items) => {
    setFileItems(items);
  }, []);
  const removeFile = useCallback(
    (id) => {
      setFileItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setFileItems],
  );
  const addFiles = useCallback(
    (userFiles) => {
      const newItems = [...files];
      if (userFiles && userFiles.length > 0) {
        for (let i = 0; i < userFiles.length; i++) {
          newItems.push({
            id: uuid(),
            name: userFiles[i].name,
            url: URL.createObjectURL(userFiles[i]),
          });
        }
      }
      setFileItems(newItems);
    },
    [files, setFileItems],
  );
  const contextd = useCallback(
    () => ({
      files,
      addFiles,
      removeFile,
      setFiles,
      moveFile,
      findFile,
      screen,
      setScreen,
      clearFiles,
    }),
    [addFiles, clearFiles, files, findFile, moveFile, removeFile, screen, setFiles],
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <FilesContext.Provider value={contextd()}>
        {children}
      </FilesContext.Provider>
    </DndProvider>
  );
}

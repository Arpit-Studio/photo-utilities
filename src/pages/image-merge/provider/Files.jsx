import { createContext, useContext } from "react";

export const FilesContext = createContext(undefined);
const useFiles = () => useContext(FilesContext);
export default useFiles;

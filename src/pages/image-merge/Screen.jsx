import FileSelect from "./components/FileSelect";
import FilesPreview from "./components/FilesPreview";
import MergeResult from "./components/Result";
import useFiles from "./provider/Files";

export default function Screen() {
  const { screen } = useFiles();
  return screen === "result" ? (
    <><MergeResult /></>
  ) : (
    <>
      <FileSelect />
      <FilesPreview />
    </>
  );
}

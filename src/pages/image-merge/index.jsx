import Screen from "./Screen";
import FilesProvider from "./provider/FilesProvider";

export default function ImageMerge() {
  return (
    <FilesProvider>
      <h2 className="my-6 text-2xl font-semibold text-gray-200">
        Passport/Citizenship Merge
      </h2>
      <div className="mt-4">
        <Screen/>
      </div>
    </FilesProvider>
  );
}

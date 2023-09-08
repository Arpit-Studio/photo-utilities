export default function PasteBoard({ handlePaste }) {
  return (
    <div
      className="col-span-12 min-w-0 p-4 rounded-lg shadow-xs bg-gray-800 flex justify-center items-center h-36"
      onPaste={handlePaste}>
      <p className=" text-gray-400 font-bold">
        Ctrl + V to paste image from clipboard
      </p>
    </div>
  );
}

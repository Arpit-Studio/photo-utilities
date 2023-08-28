export default function PasteBoard({ handlePaste }) {
  return (
    <div
      className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 flex justify-center items-center h-36"
      onPaste={handlePaste}>
      <p className="text-gray-600 dark:text-gray-400">
        Ctrl + V to paste image from clipboard
      </p>
    </div>
  );
}

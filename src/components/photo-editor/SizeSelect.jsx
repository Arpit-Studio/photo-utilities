import { photo_sizes } from "../../utilities/photo";

export default function SizeSelect({ onChange }) {
  return (
    <div className="col-span-4">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={e=>onChange(e.target.value)}>
        {photo_sizes.map((size, index) => (
          <option value={index} key={index}>
            {size.label}
          </option>
        ))}
      </select>
    </div>
  );
}

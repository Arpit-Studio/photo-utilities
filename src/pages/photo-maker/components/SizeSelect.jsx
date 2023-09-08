import { photo_sizes } from "../../../utilities/photo";

export default function SizeSelect({ onChange }) {
  return (
    <div className="col-span-4">
      <select
        className="border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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

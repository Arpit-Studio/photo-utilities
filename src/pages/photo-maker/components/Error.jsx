export default function MergeError({message}){
    return (
        <div
          className="min-w-0 p-4 rounded-lg shadow-xs bg-red-800"
         >
          <p className="text-gray-300">
           {message}
          </p>
        </div>
      );
}
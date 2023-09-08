export default function MergeError({message}){
    return (
        <div
          className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-red-800"
         >
          <p className="text-gray-300 dark:text-gray-300">
           {message}
          </p>
        </div>
      );
}
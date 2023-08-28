import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <Header />
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

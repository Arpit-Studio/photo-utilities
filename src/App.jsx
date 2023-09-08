import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Error404 from "./components/Error404";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import ImageMerge from "./pages/image-merge";
import Merge from "./pages/photo-maker";

function App() {
  let routes = [
    {
      path:"/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "photo-maker",
          element: <Merge />,
        },
        {
          path: "image-merger",
          element: <ImageMerge />,
        },
        { path: "*", element: <Error404 /> },
      ],
    },
  ];
  const router=createHashRouter(routes);
  return (
      <RouterProvider router={router} />
  );
}

export default App;

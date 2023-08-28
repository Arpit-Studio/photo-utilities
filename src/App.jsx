import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Error404 from "./components/Error404";
import Layout from "./components/Layout";
import Dashboard from "./components/pages/Dashboard";
import PP12 from "./components/pages/PP12";

function App() {
  let routes = [
    {
      path:"/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "merge",
          element: <PP12 />,
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

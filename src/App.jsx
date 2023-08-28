import { useRoutes } from "react-router-dom";
import "./App.css";
import Error404 from "./components/Error404";
import Layout from "./components/Layout";
import Dashboard from "./components/pages/Dashboard";
import PP12 from "./components/pages/PP12";

function App() {
  let routes = [
    {
      path:process.env.PUBLIC_URL || "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "pp-12",
          element: <PP12 />,
        },
        { path: "*", element: <Error404 /> },
      ],
    },
  ];
  const elements=useRoutes(routes);
  return (
      <>{elements}</>
  );
}

export default App;

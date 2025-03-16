import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Transactions from "../pages/Transactions";
import TransactionsDetails from "../pages/TransactionsDetails";

export const routeConfig = {
  path: "/",
  element: <Layout />,
  name: "",
  secure: false,
  children: [
    {
      path: "/",
      element: <Transactions />,
      name: "Trans List",
      secure: true,
      fullscreen: false,
    },
    {
      path: "/transaction/:id",
      element: <TransactionsDetails />,
      name: "Trans Detail",
      secure: true,
      fullscreen: false,
    },

    {
      path: "*",
      element: <Navigate to="/" replace />,
      name: "",
      secure: false,
      fullscreen: true,
    },
  ],
};

// Create routes dynamically
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routeConfig.path} element={<Layout />}>
      {routeConfig.children.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
  )
);

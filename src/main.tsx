import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <div className="min-h-screen min-w-full">
    <RouterProvider router={routes} />
  </div>
);

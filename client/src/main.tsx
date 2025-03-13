import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import Register from "./pages/register";
import UpdatePassword from "./pages/update-password";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <div>index</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

import { createRoot } from "react-dom/client";

import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import Register from "./pages/register";
import UpdatePassword from "./pages/update-password";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/index";
import { UpdateInfo } from "./pages/update_info";

const routes = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
    ],
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

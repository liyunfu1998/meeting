import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/index";
import ErrorPage from "./pages/error-page";
import UserManage from "./pages/user-manage";
import Login from "./pages/login";
import Menu from "./pages/menu";
import ModifyMenu from "./pages/modify-menu";
import InfoModify from "./pages/info-modify";
import PasswordModify from "./pages/password-modify";

const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Menu></Menu>,
        children: [
          {
            path: "user_manage",
            element: <UserManage />,
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: <ModifyMenu></ModifyMenu>,
    children: [
      {
        path: "info_modify",
        element: <InfoModify></InfoModify>,
      },
      {
        path: "password_modify",
        element: <PasswordModify></PasswordModify>,
      },
    ],
  },
  { path: "login", element: <Login /> },
];

export const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

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
import MeetingRoomManage from "./pages/meeting-room-manage";
import BookingManage from "./pages/booking-manage";
import Statistics from "./pages/statistics";

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
            path: "/",
            element: <MeetingRoomManage />,
          },
          {
            path: "user_manage",
            element: <UserManage />,
          },
          {
            path: "meeting_room_manage",
            element: <MeetingRoomManage />,
          },
          {
            path: "booking_manage",
            element: <BookingManage />,
          },
          {
            path: "statistics",
            element: <Statistics />,
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

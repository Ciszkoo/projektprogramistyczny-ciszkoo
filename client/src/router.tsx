import { createBrowserRouter } from "react-router-dom";
import AuthProviderLayout from "./components/AuthProviderLayout";
import UserTimeline from "./components/UserPage/UserTimeline";
import FriendsRoute from "./routes/FriendsRoute";
import MainRoute from "./routes/MainRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserInfoRoute from "./routes/UserInfoRoute";
import UserRoute from "./routes/UserRoute";

export const router = createBrowserRouter([
  {
    element: <AuthProviderLayout />,
    children: [
      {
        path: "/",
        element: <MainRoute />,
      },
      {
        path: "/user/:id",
        element: (
          <ProtectedRoute>
            <UserRoute />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <UserTimeline />,
          },
          {
            path: "details",
            element: <UserInfoRoute />,
          },
          {
            path: "friends",
            element: <FriendsRoute />,
          },
        ],
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

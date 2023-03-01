import { createBrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import FriendsRoute from "./routes/FriendsRoute";
import MainRoute from "./routes/MainRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserInfoRoute from "./routes/UserInfoRoute";
import UserRoute from "./routes/UserRoute";
import { store } from "./store";
import { fetchUserData } from "./reducers/userReducer";
import Dashboard from "./components/Dashboard/Dashboard";
import { fetchFriendsPosts } from "./reducers/postsReducer";
import UserTimelineRoute from "./routes/UserTimelineRoute";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainRoute />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: async () => {
          await store.dispatch(fetchFriendsPosts(0));
          return null;
        },
      },
      {
        path: "/user/:id",
        element: (
          <ProtectedRoute>
            <UserRoute />
          </ProtectedRoute>
        ),
        loader: ({ params }) => {
          typeof params.id === "string" &&
            store.dispatch(fetchUserData(params.id));
          return null;
        },
        children: [
          {
            path: "",
            element: <UserTimelineRoute />,
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

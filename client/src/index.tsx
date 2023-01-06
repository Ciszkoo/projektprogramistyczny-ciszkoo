import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProviderLayout from "./components/AuthProviderLayout";
import { Provider as StoreProvider } from "react-redux";
import "./index.css";

import LoginPage from "./routes/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { store } from "./store";
import UserPage from "./routes/UserPage";
import axios from "axios";
import UserInfoPage from "./routes/UserInfoPage";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    element: <AuthProviderLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <p>Dashboard</p>
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/:id",
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/user/:id/edit",
      //   element: (
      //     <ProtectedRoute>
      //       <UserInfoPage />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

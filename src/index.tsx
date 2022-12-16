import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import "./index.css";

import LoginPage from "./routes/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const AuthProviderLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
)

const router = createBrowserRouter([
  {
    element: <AuthProviderLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: <ProtectedRoute><h1>Home</h1></ProtectedRoute>,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProviderLayout from "./components/AuthProviderLayout";
import "./index.css";

import LoginPage from "./routes/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <h1>Home</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

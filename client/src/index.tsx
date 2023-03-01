import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import "./index.css";

import { store } from "./store";
import axios from "axios";
import AuthProvider from "./context/AuthProvider";
import { router } from "./router";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>
);

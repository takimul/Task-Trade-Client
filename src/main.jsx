import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import router from "./Router/route.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./Provider/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        {" "}
        {/* Wrap with ThemeProvider */}
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={router}
        />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);

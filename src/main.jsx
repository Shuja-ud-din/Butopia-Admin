import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppData from "./context/AppData.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AppData>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppData>
  // </React.StrictMode>
);

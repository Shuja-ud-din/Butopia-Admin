import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Registration from "./views/Login/index";
import { useEffect, useState } from "react";
import SocketProvider from "./context/Socket";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location.pathname]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Registration />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route path="/admin/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Registration />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            <>
              {/* <SocketProvider> */}
              <Dashboard />
              {/* </SocketProvider> */}
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;

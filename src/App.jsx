import { useContext } from "react";
import "./App.css";
import { DataContext } from "./context/AppData";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/admin" /> : <>Login</>}
          />
          <Route
            path="/admin/*"
            element={
              <>
                <ProtectedRoute isAuthenticated={!isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

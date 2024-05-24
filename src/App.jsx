import { useContext } from "react";
import "./App.css";
import { DataContext } from "./context/AppData";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Registration from "./views/Login/index";
import SocketProvider from "./context/Socket";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Registration />} />
          <Route
            path="/admin/*"
            element={
              <>
                {/* <ProtectedRoute isAuthenticated={true}> */}
                <SocketProvider>
                  <Dashboard />
                </SocketProvider>
                {/* </ProtectedRoute> */}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

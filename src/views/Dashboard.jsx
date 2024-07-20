import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Appoinments from "../pages/Appoinments";
import Customers from "../pages/Customers.";
import DashboardPage from "../pages/DashboardPage";
import Categories from "../pages/Categories";
import Services from "../pages/Services";
import Providers from "../pages/Providers";
import Admins from "../pages/Admins";
import Payments from "../pages/Payments";
import Support from "../pages/Support";
import Chats from "../pages/Chats";
import { AppContext } from "../context/AppData";
import NotFound from "../pages/NotFound";
import { socket } from "../utils/socket";
import useChat from "../Hooks/useChat";

const Dashboard = () => {
  const { user, setUser, setOnlineUsers } = useContext(AppContext);
  const userObj = localStorage.getItem("user");
  const { getOnlineUsers } = useChat();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      const token = localStorage.getItem("token");
      socket.emit("join", { token });
      console.log("Connected to server");
    });

    socket.on("onlineUsers", (data) => {
      console.log("onlineUsers: ", data);
      setOnlineUsers(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    getOnlineUsers();

    setUser(JSON.parse(userObj));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-full min-h-screen">
        <Header />
        <div
          className="w-full grid grid-cols-12 "
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div className="col-span-2 h-full overflow-y-auto">
            <SideBar />
          </div>
          <div className="col-span-10 bg-[#f8f9fa] overflow-y-auto p-10">
            <Routes>
              {user?.role === "Admin" ? (
                <>
                  <Route path="/" element={<>Admin</>} />
                  <Route path="/dashboard/" element={<DashboardPage />} />
                  <Route path="/appointments/*" element={<Appoinments />} />
                  <Route path="/customers/*" element={<Customers />} />
                  <Route path="/categories/*" element={<Categories />} />
                  <Route path="/services/*" element={<Services />} />
                  <Route path="/providers/*" element={<Providers />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="*" element={<NotFound />} />
                </>
              ) : user?.role === "Super Admin" ? (
                <>
                  <Route path="/" element={<>Admin</>} />
                  <Route path="/dashboard/" element={<DashboardPage />} />
                  <Route path="/appointments/*" element={<Appoinments />} />
                  <Route path="/customers/*" element={<Customers />} />
                  <Route path="/categories/*" element={<Categories />} />
                  <Route path="/services/*" element={<Services />} />
                  <Route path="/providers/*" element={<Providers />} />
                  <Route path="/admins/*" element={<Admins />} />
                  <Route path="/payments/*" element={<Payments />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="*" element={<NotFound />} />
                </>
              ) : (
                <>
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

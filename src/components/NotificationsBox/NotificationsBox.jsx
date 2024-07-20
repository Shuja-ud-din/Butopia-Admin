import React, { useEffect } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import moment from "moment";
import { useReadAllNotifications } from "../../Hooks/useNotifications";

const NotificationsBox = ({ ref, notifications }) => {
  const { readAllNotifications } = useReadAllNotifications();

  return (
    <>
      <div
        ref={ref}
        className=" absolute top-[60px] right-[8rem] rounded-md bg-[white] border border-secondary w-[400px] z-[999] shadow-lg "
      >
        <div className="profile_head bg-[#f9f9f9] flex p-4 rounded-tl-md rounded-tr-md border-b border-secondary  ">
          <div>
            <h3 className="text-[20px] text-[#353535] font-[600] ">
              Notifications
            </h3>
          </div>
        </div>
        <div className="profile_body">
          <ul className="max-h-[20rem] overflow-auto">
            {notifications.length > 0 ? (
              notifications.reverse().map((notification) => {
                return (
                  <li className="border-b border-secondary">
                    <div
                      className={`p-4 py-2 flex items-start border-b border-[#dedada] grid grid-cols-12 ${
                        notification.isRead ? "opacity-[0.4]" : ""
                      } `}
                    >
                      <div
                        className={`mt-2 rounded-full ${
                          notification.isRead ? "bg-[#d2c619] " : "bg-[#1976d2]"
                        } w-[10px] h-[10px] col-span-1`}
                      ></div>
                      <div className="flex flex-col col-span-9">
                        <p className="text-[18px] font-[600]">
                          {notification.title}
                        </p>
                        <p className="text-[15px] font-[400]">
                          {notification.message}
                        </p>
                      </div>
                      <div className="col-span-2 flex flex-col justify-end items-end">
                        {notification.isRead ? (
                          <MdOutlineMarkEmailRead
                            style={{ fontSize: "22px" }}
                          />
                        ) : (
                          <IoMailOpenOutline
                            className="cursor-pointer"
                            style={{ fontSize: "22px" }}
                            // onClick={() =>
                            //   readNotification(notification.NotificationId)
                            // }
                          />
                        )}
                        <p className="mt-2 text-[14px] text-[grey]">
                          {moment(notification.createdAt).format("LT")}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-center py-3 border-b border-secondary">
                No notifications available
              </p>
            )}
          </ul>
          <div>
            <div className="p-4 flex " onClick={readAllNotifications}>
              <h4 className="text-[15px] text-[#353535] font-[600] cursor-pointer">
                Mark all as read
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsBox;

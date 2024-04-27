import React from "react";

const NotificationsBox = ({ ref }) => {
  return (
    <>
      <div
        ref={ref}
        className=" absolute top-[60px] right-[8rem] rounded-md bg-[white] border border-secondary w-[400px] z-[999]"
      >
        <div className="profile_head bg-[#f9f9f9] flex p-4 rounded-tl-md rounded-tr-md border-b border-secondary  ">
          <div>
            <h3 className="text-[20px] text-[#353535] font-[600] ">
              Notifications
            </h3>
          </div>
        </div>
        <div className="profile_body">
          <ul className="">
            <li className="border-b border-secondary">
              <div className="p-4 flex items-start border-b border-[#dedada] grid grid-cols-12">
                <div className="mt-2 rounded-full bg-[#1976d2] w-[10px] h-[10px] col-span-1"></div>
                <div className="flex flex-col col-span-11">
                  <p className="text-[15px] font-[400]">
                    Lorem, ipsum dolor sit amet elit. Quia, corporis!
                  </p>
                  <p className="mt-2 text-[14px] text-[grey]">Now</p>
                </div>
              </div>
            </li>

            <li>
              <div className="p-4 flex ">
                <h4 className="text-[15px] text-[#353535] font-[600] cursor-pointer">
                  Mark all as read
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NotificationsBox;

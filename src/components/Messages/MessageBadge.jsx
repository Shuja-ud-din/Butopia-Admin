import moment from "moment";
import React from "react";

const MessageBadge = ({ text, date }) => {
  return (
    <div className="w-full flex justify-center my-1  ">
      <p
        className={`text-center ${
          date ? "bg-primary text-[white]" : "bg-[#e8e8e8]"
        } text-[13px] rounded-full px-5 shadow`}
      >
        {text || (date && moment(date).format("MMM DD, YYYY"))}
      </p>
    </div>
  );
};

export default MessageBadge;

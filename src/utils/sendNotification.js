import { notification } from "antd";

export const sendNotification = (message, description) => {
  console.log("notification sent");
  notification.config({
    duration: 4,
  });
  notification.open({
    message,
    description,
    placement: "topRight",
  });
};

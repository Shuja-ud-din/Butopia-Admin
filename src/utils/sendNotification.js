import { notification } from "antd";

export const sendNotification = (message, description) => {
  notification.config({
    duration: 4,
  });
  notification.open({
    message,
    description,
    placement: "topRight",
  });
};

const formatTime = (time) => {
  const date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const isSameDay = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const toUnix = (dateString) => {
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000);
};

export { formatTime };

export const formatChatDate = (dateString) => {
  const inputDate = new Date(dateString);
  const now = new Date();

  const inputDateMidnight = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const nowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
  const diffDays = Math.round((nowMidnight - inputDateMidnight) / oneDay);

  if (diffDays === 0) {
    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    const options = {
      // weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return inputDate.toLocaleDateString("en-US", options);
  }
};

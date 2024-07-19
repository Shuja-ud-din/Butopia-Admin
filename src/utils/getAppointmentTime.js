const getAppointmentTime = (appointmentDate, appointmentTime) => {
  const date = new Date(appointmentDate);
  const timeZone = appointmentTime.split(" ");

  if (timeZone[1] === "AM") {
    date.setHours(timeZone[0].split(":")[0]);
    date.setMinutes(timeZone[0].split(":")[1]);
  } else {
    date.setHours(timeZone[0].split(":")[0] + 12);
    date.setMinutes(timeZone[0].split(":")[1]);
  }

  return date;
};

export default getAppointmentTime;

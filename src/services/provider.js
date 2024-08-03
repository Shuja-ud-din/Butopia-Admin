import { api } from "../api/api";
import { formatTime } from "../utils/timeFormat";

export const getProviderAvailabilty = async (id) => {
  if (!id) return {};

  const { data } = await api.get(`/api/provider/availability/${id}`);

  return data;
};

const splitWorkingTimes = (workingTime) => {
  const isPm = workingTime.includes("PM");
  const [hours, minutes] = workingTime.split(" ")[0].split(":");

  return {
    isPm,
    hours: parseInt(hours),
    minutes: parseInt(minutes),
  };
};

const createSlots = (startTime, endTime) => {
  let slots = [];

  const starthours = startTime.hours + (startTime.isPm ? 0 : 12);
  const endHours = endTime.hours + (endTime.isPm ? 0 : 12);

  const slotDuration = 30;
  const start = starthours < endHours ? starthours : endHours;
  const end = endHours > starthours ? endHours : starthours;

  for (let i = start; i <= end; i++) {
    let hour = i;
    let isPm = startTime.isPm;

    if (i > 12) hour = i - 12;
    if (i >= 12) isPm = !isPm;

    for (let j = 0; j < 2; j++) {
      let minutes =
        j === 0 ? startTime.minutes : startTime.minutes + slotDuration;

      if (startTime.minutes >= 30) {
        minutes =
          j === 1 ? startTime.minutes : startTime.minutes + slotDuration;
      }

      if (minutes >= 60) {
        minutes = minutes - 60;
      }
      if (i === end && minutes > endTime.minutes) break;
      const time = `${minutes >= 60 ? hour + 1 : hour}:${
        minutes === 0 ? "00" : minutes
      } ${isPm ? "PM" : "AM"}`;

      slots.push(time);
    }
  }

  return slots;
};

// const removeBookedSlots = (bookedAppointmnets, slots) => {
//   return slots.filter((slot) => {
//     const isBooked = bookedAppointmnets.find((appointment) => {
//       return formatTime(appointment.time) === slot;
//     });

//     return !isBooked;
//   });
// };

export const getAvailabiltySlots = (workingTimes, bookedAppointmnets) => {
  const { start, end } = workingTimes;

  const startTime = splitWorkingTimes(start);
  const endTime = splitWorkingTimes(end);

  const slots = createSlots(startTime, endTime);

  //   const slots = removeBookedSlots([], timeSlots);

  const morningSlots = slots.filter((slot) => slot.includes("AM"));

  const eveningSlots = slots.filter((slot) => slot.includes("PM"));

  return { morning: morningSlots, evening: eveningSlots };
};

import {HOUR, DAY} from "../const";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const isEscPushed = (evt) => {
  return (evt.key === `Escape` || evt.key === `Esc`);
};

export const createEventDate = (startTime, endTime) => {
  const monthDay = startTime.format(`MMM DD`);
  const fullStartDate = startTime.format(`YYYY-MM-DDTHH:mm`);
  const hoursMinutesStart = startTime.format(`HH:mm`);
  const hoursMinutesEnd = endTime.format(`HH:mm`);
  const fullEndDay = endTime.format(`YYYY-MM-DDTHH:mm`);
  const totalMinutes = endTime.diff(startTime, `minute`);
  const totalHours = Math.floor(totalMinutes / HOUR);
  const totalDays = Math.floor(totalMinutes / DAY);
  const minutesLeft = totalMinutes - totalHours * 60;
  const hoursLeft = totalHours - totalDays * 24;
  const daysLeft = totalDays;
  const minutesLeftFormatted = minutesLeft.toString().padStart(2, `0`);
  const hoursLeftFormatted = hoursLeft.toString().padStart(2, `0`);
  const dayLeftFormatted = daysLeft.toString().padStart(2, `0`);

  let duration;
  if (daysLeft > 0) {
    duration = `${dayLeftFormatted}D ${hoursLeftFormatted}H ${minutesLeftFormatted}M`;
  } else if (hoursLeft > 0) {
    duration = `${hoursLeftFormatted}H ${minutesLeftFormatted}M`;
  } else if (minutesLeft > 0) {
    duration = `${minutesLeftFormatted}M`;
  }

  return {
    monthDay,
    fullStartDate,
    hoursMinutesStart,
    hoursMinutesEnd,
    fullEndDay,
    duration
  };
};

import dayjs from "dayjs";
import {getRandomInteger} from "../utils/utils";

const getDescription = () => {
  const description = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  ];

  const descriptionCount = getRandomInteger(0, 4);
  const randomIndex = getRandomInteger(0, description.length - 1);
  const randomDescription = [];
  for (let i = 0; i < descriptionCount; i++) {
    randomDescription.push(description[randomIndex]);
  }

  return randomDescription.join(` `);
};

const getType = () => {
  const types = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const getDestination = () => {
  const cities = [`Amsterdam`, `Chamonix`, `Geneva`];
  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const getOffer = () => {
  return [
    {
      name: `Add luggage`,
      price: getRandomInteger(0, 200),
      label: `luggage`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Switch to comfort`,
      price: getRandomInteger(5, 200),
      label: `comfort`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Add meal`,
      price: getRandomInteger(5, 200),
      label: `meal`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Choose seats`,
      price: getRandomInteger(5, 200),
      label: `seats`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Travel by train`,
      price: getRandomInteger(5, 200),
      label: `train`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
  ];
};

const getPhotos = () => {
  const photosCount = getRandomInteger(1, 10);
  const randomPhotos = [];
  for (let i = 0; i <= photosCount; i++) {
    randomPhotos.push(`http://picsum.photos/248/152?r=${i}`);
  }
  return randomPhotos;
};

const getDate = () => {
  const DaysGap = 7;
  const minTime = 30;
  const maxTime = 90;
  const daysGap = getRandomInteger(-DaysGap, DaysGap);
  const timeGap = getRandomInteger(minTime, maxTime);
  const date = dayjs().add(daysGap, `day`).toDate();
  const startTime = dayjs(date).add(timeGap, `minute`);
  const endTime = dayjs(startTime).add(timeGap, `minute`);
  return {
    startTime,
    endTime,
  };
};

export const getEvent = () => {
  const date = getDate();

  return {
    type: getType(),
    destination: getDestination(),
    offers: getOffer(),
    startTime: date.startTime,
    endTime: date.endTime,
    description: getDescription(),
    photos: getPhotos(),
    price: getRandomInteger(20, 600),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

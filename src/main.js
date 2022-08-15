import Trip from "./presenter/trip";
import {getEvent} from "./mock/event";
import {COUNT_EVENT} from "./const";


const events = new Array(COUNT_EVENT)
  .fill()
  .map(getEvent)
  .sort((a, b) => a.startTime - b.startTime);

const tripEventsElement = document.querySelector(`.trip-events`);

const trip = new Trip(tripEventsElement, events);

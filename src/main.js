import Trip from "./presenter/trip";
import {getEvent} from "./mock/event";
import {COUNT_EVENT} from "./const";


const events = new Array(COUNT_EVENT)
  .fill()
  .map(getEvent)
  .sort((a, b) => a.startTime - b.startTime);

const route = new Set();

for (let event of events) {
  route.add(event.destination);
}

export const routeList = Array.from(route).join(` &mdash; `);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripPresenter = new Trip(tripEventsElement);
tripPresenter.init(events);

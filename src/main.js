import { createTripInfo } from "./view/trip-info.js";
import { createTripCost } from "./view/trip-cost.js";
import { createTripTabs } from "./view/trip-tabs.js";
import { createTripFilters } from "./view/trip-filters.js";
import { createTripSort } from "./view/trip-sort.js";
import { createEventList } from "./view/event-list.js";
import { createEventItem } from "./view/event-item.js";
import { editEventItem } from "./view/edit-event-item.js";
import { getEvent } from "./mock/event";
import {render, positionRender} from "./utils";

const COUNT_EVENT = 15;

const events = new Array(COUNT_EVENT)
  .fill()
  .map(getEvent)
  .sort((a, b) => a.startTime - b.startTime);

export const route = new Set();
export const routeDate = new Array(events);
for (event of events) {
  route.add(event.destination);
  routeDate.push(event.startTime);
}

const routeList = Array.from(route).join(` &mdash; `);

const tripMainElement = document.querySelector(`.trip-main`);
const pageMainElement = document.querySelector(`.page-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripMainElement, createTripInfo(events, routeList), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripCost(events), `beforeend`);

render(tripControlsElement, createTripTabs(), `beforeend`);
render(tripControlsElement, createTripFilters(), `beforeend`);
render(tripEventsElement, createTripSort(), `beforeend`);
render(tripEventsElement, createEventList(), `beforeend`);

const eventsList = pageMainElement.querySelector(`.trip-events__list`);

render(eventsList, editEventItem(events[0]), `beforeend`);

for (let i = 0; i < COUNT_EVENT; i++) {
  render(eventsList, createEventItem(events[i]), `beforeend`);
}

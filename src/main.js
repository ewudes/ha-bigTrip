import { createTripInfo } from "./view/trip-info.js";
import { createTripCost } from "./view/trip-cost.js";
import { createTripTabs } from "./view/trip-tabs.js";
import { createTripFilters } from "./view/trip-filters.js";
import { createTripSort } from "./view/trip-sort.js";
import { createEventList } from "./view/event-list.js";
import { createEventItem } from "./view/event-item.js";
import { editEventItem } from "./view/edit-event-item.js";

const COUNT_EVENT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const pageMainElement = document.querySelector(`.page-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripMainElement, createTripInfo(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripCost(), `beforeend`);
render(tripControlsElement, createTripTabs(), `beforeend`);
render(tripControlsElement, createTripFilters(), `beforeend`);
render(tripEventsElement, createTripSort(), `beforeend`);
render(tripEventsElement, createEventList(), `beforeend`);

const eventsList = pageMainElement.querySelector(`.trip-events__list`);

render(eventsList, editEventItem(), `beforeend`);

for (let i = 0; i < COUNT_EVENT; i++) {
  render(eventsList, createEventItem(), `beforeend`);
}

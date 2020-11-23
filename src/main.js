import { createTripInfo } from "./view/trip-info.js";
import { createTripCost } from "./view/trip-cost.js";
import { createTripTabs } from "./view/trip-tabs.js";
import { createTripFilters } from "./view/trip-filters.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, createTripInfo(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripCost(), `beforeend`);

render(tripControlsElement, createTripTabs(), `beforeend`);

render(tripControlsElement, createTripFilters(), `beforeend`);

import Abstract from "./abstract";
import {MAX_POINTS} from "../const";

const createTripInfo = (events) => {
  const route = new Set();
  for (let event of events) {
    route.add(event.destination);
  }
  const startDate = events[0].startTime.format(`MMM DD`);
  const endDate = events[events.length - 1].startTime.format(`DD`);
  const routeArray = Array.from(route);
  let routeEvents;
  if (routeArray.lenth > MAX_POINTS) {
    routeEvents = `${routeArray[0]} &mdash; ... &mdash; ${routeArray[routeArray.length - 1]}}`;
  } else {
    routeEvents = routeArray.join(` &mdash; `);
  }

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${routeEvents}</h1>

      <p class="trip-info__dates">${startDate} &mdash;&nbsp; ${endDate}</p>
    </div>
  </section>`;
};

export default class TripInfo extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfo(this._events);
  }
}

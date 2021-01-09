import Abstract from "./abstract";

const createTripInfo = (events, routeList) => {
  const startDate = events[0].startTime.format(`MMM DD`);
  const endDate = events[events.length - 1].startTime.format(`DD`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${routeList}</h1>

      <p class="trip-info__dates">${startDate} &mdash;&nbsp; ${endDate}</p>
    </div>
  </section>`;
};

export default class TripInfo extends Abstract {
  constructor(events, routeList) {
    super();
    this._events = events;
    this._routeList = routeList;
  }

  getTemplate() {
    return createTripInfo(this._events, this._routeList);
  }
}

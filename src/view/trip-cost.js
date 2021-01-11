import Abstract from "./abstract";

const createTripCost = (events) => {
  const totalPrice = events.reduce((price, event) => {
    return price + event.price;
  }, 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};

export default class TripCost extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCost(this._events);
  }
}

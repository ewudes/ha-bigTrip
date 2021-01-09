import Abstract from "./abstract";

const createEventList = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class EventList extends Abstract {
  getTemplate() {
    return createEventList();
  }
}

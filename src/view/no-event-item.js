import Abstract from "./abstract";

const noEventItem = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoItem extends Abstract {
  getTemplate() {
    return noEventItem();
  }
}

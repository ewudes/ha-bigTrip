import Abstract from "./abstract";
import {SORT} from "../const";

const createTripSort = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" data-sort="${SORT.DEFAULT}" type="radio" name="trip-sort" value="sort-day" checked>
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" data-sort="${SORT.TIME}" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" data-sort="${SORT.PRICE}" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>`;
};

export default class TripSort extends Abstract {
  constructor() {
    super();
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripSort();
  }

  _sortChangeHandler(evt) {
    if (evt.target.className === `trip-sort__input`) {
      return;
    }

    this._callback.sortChange(evt.target.dataset.sort);
  }

  setSortChangeHandler(callback) {
    this._callback.sortChange = callback;
    this.getElement().addEventListener(`click`, this._sortChangeHandler);
  }
}

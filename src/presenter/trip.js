import TripInfo from "../view/trip-info";
import TripCost from "../view/trip-cost";
import TripTabs from "../view/trip-tabs";
import TripFilter from "../view/trip-filters";
import TripSort from "../view/trip-sort";
import EventList from "../view/event-list";
import NoItem from "../view/no-event-item";
import Event from "./event";
import {routeList} from "../main";
import {render, positionRender} from "../utils/render";
import {updateItem} from "../utils/utils";

export default class Trip {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._eventPresenter = {};

    this._tripTabsComponent = new TripTabs();
    this._tripFilterComponent = new TripFilter();
    this._tripSortComponent = new TripSort();
    this._eventListComponent = new EventList();
    this._noItemComponent = new NoItem();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
  }

  init(events) {
    this._events = events.slice();

    this._tripInfo = new TripInfo(events, routeList);

    if (!this._events.length) {
      render(this._eventsContainer, this._noItemComponent, positionRender.AFTERBEGIN);
      return;
    }

    this._renderTripInfo(events);
    this._renderSort();
    render(this._eventsContainer, this._eventListComponent, positionRender.BEFOREEND);
    this._renderEvents();
  }

  _renderTripInfo(events) {
    this._tripCost = new TripCost(events);
    const tripMainElement = document.querySelector(`.trip-main`);
    const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
    tripControlsElement.innerHTML = ``;
    render(tripControlsElement, this._tripTabsComponent, positionRender.AFTERBEGIN);
    render(tripControlsElement, this._tripFilterComponent, positionRender.BEFOREEND);

    if (this._events.length === 0) {
      return;
    }

    render(tripMainElement, this._tripInfo, positionRender.AFTERBEGIN);
    const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
    render(tripInfoElement, this._tripCost, positionRender.BEFOREEND);
  }

  _renderSort() {
    render(this._eventsContainer, this._tripSortComponent, positionRender.AFTERBEGIN);
  }

  _renderEvent(event, isOpen) {
    const eventPresenter = new Event(this._eventListComponent, this._handleEventChange, this._handleModelChange);
    eventPresenter.init(event, isOpen);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    this._events.forEach((event, index) =>
      this._renderEvent(event, index === 0)
    );
  }

  _clearEventList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _handleEventChange(updateEvent) {
    this._events = updateItem(this._events, updateEvent);
    this._eventPresenter[updateEvent.id].init(updateEvent);
  }

  _handleModelChange() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }
}

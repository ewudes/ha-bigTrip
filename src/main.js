import TripInfo from "./view/trip-info";
import TripCost from "./view/trip-cost";
import TripTabs from "./view/trip-tabs";
import TripFilter from "./view/trip-filters";
import TripSort from "./view/trip-sort";
import EventList from "./view/event-list";
import EventItem from "./view/event-item";
import EditEventItem from "./view/edit-event-item";
import NoItem from "./view/no-event-item";
import {getEvent} from "./mock/event";
import {render, positionRender, replace} from "./utils/render";
import {COUNT_EVENT} from "./const";


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
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`)

render(tripControlsElement, new TripTabs(), positionRender.AFTERBEGIN);
render(tripControlsElement, new TripFilter(), positionRender.BEFOREEND);

const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const renderTripInfo = (item) => {
  if (item.length === 0) {
    return;
  }

  render(tripMainElement, new TripInfo(item, routeList), positionRender.AFTERBEGIN);
  const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
  render(tripInfoElement, new TripCost(item), positionRender.BEFOREEND);
};

const renderItem = (listItem, item) => {
  const itemComponent = new EventItem(item);
  const itemEditComponent = new EditEventItem(item);
  const replaceItemToForm = () => {
    replace(itemEditComponent, itemComponent);
  };
  const replaceFormToItem = () => {
    replace(itemComponent, itemEditComponent);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  itemComponent.setEditClickHandler(() => {
    replaceItemToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  itemEditComponent.setFormSubmitHandler(() => {
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(listItem, itemComponent, positionRender.BEFOREEND);
};

const renderList = (itemContainer, items) => {
  const listItem = new EventList();
  if (items.length === 0) {
    render(itemContainer, new NoItem(), positionRender.AFTERBEGIN);
    return;
  }
  renderTripInfo(items);
  render(itemContainer, new TripSort(), positionRender.AFTERBEGIN);
  render(itemContainer, listItem, positionRender.BEFOREEND);
  items.forEach((item) => renderItem(listItem, item));
};

renderList(tripEventsElement, events);

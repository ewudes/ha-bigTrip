import EventItem from "../view/event-item";
import EditEventView from "../view/edit-event-item";
import {render, replace, remove, positionRender} from "../utils/render";
import {isEscPushed} from "../utils/utils";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class Event {
  constructor(eventListComponent, changeData, changeMode) {
    this._eventListComponent = eventListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleEditFormClick = this._handleEditFormClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  itit(event, isOpen) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventItem(event);
    this._eventEditComponent = new EditEventView(event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setEditClickHandler(this._handleEditFormClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListComponent, this._eventComponent, positionRender.BEFOREEND);

      if (isOpen) {
        this._replaceEventToForm();
      }

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscPushed(evt)) {
      evt.preventDefault();
      this._replaceFormToEvent();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToEvent();
  }

  _handleEditFormClick() {
    this._replaceFormToEvent();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._event, {isFavorite: !this._event.isFavorite}));
  }
}

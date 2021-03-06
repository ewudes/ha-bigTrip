import Abstract from "./abstract";

const renderOffer = (event) => {
  return event.offers
    .map((offer, index) => {
      const checked = offer.checked === true ? `checked` : ``;

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.label}-${index}" type="checkbox" name="event-offer-${offer.label}" ${checked}>
        <label class="event__offer-label" for="event-offer-${offer.label}-${index}">
          <span class="event__offer-title">${offer.name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    }).join(``);
};

export default class EventOffer extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return renderOffer(this._event);
  }
}

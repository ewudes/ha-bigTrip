export const createEventItem = (event) => {
  const hour = 60;
  const day = 1440;
  const {
    type,
    price,
    startTime,
    endTime,
    destination,
    isFavorite,
    offers
  } = event;
  const monthDay = startTime.format(`MMM DD`);
  const fullStartDate = startTime.format(`YYYY-MM-DDTHH:mm`);
  const hoursMinutesStart = startTime.format(`HH:mm`);
  const hoursMinutesEnd = endTime.format(`HH:mm`);
  const fullEndDay = endTime.format(`YYYY-MM-DDTHH:mm`);
  const totalMinutes = endTime.diff(startTime, `minute`);
  const totalHours = Math.floor(totalMinutes / hour);
  const totalDays = Math.floor(totalMinutes / day);
  const minutesLeft = totalMinutes - totalHours * 60;
  const hoursLeft = totalHours - totalDays * 24;
  const daysLeft = totalDays;
  const minutesLeftFormatted = minutesLeft.toString().padStart(2, `0`);
  const hoursLeftFormatted = hoursLeft.toString().padStart(2, `0`);
  const dayLeftFormatted = daysLeft.toString().padStart(2, `0`);

  let duration;
  if (daysLeft > 0) {
    duration = `${dayLeftFormatted}D ${hoursLeftFormatted}H ${minutesLeftFormatted}M`;
  } else if (hoursLeft > 0) {
    duration = `${hoursLeftFormatted}H ${minutesLeftFormatted}M`;
  } else if (minutesLeft > 0) {
    duration = `${minutesLeftFormatted}M`;
  }

  const favorite = isFavorite === true ? `event__favorite-btn--active` : ``;

  const renderOffer = () => {
    return offers
      .map((offer) => {
        if (offer.checked === true) {
          return `<li class="event__offer">
                    <span class="event__offer-title">${offer.name}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`;
        } else {
          return ``;
        }
      })
      .join(``);
  };

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-20">${monthDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${fullStartDate}">${hoursMinutesStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${fullEndDay}">${hoursMinutesEnd}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderOffer()}
      </ul>
      <button class="event__favorite-btn ${favorite}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

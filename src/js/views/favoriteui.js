import currency from "./currency";
import favorites from "../store/favorites";

class FavoriteUI {
  constructor() {
    this.container = document.querySelector(".tickets-sections .row");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    this._btn = document.querySelector(".dropdown-trigger");
  }

  get btn() {
    return this._btn;
  }

  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    const currency = this.getCurrencySymbol();

    tickets.forEach((ticket) => {
      const template = FavoriteUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = FavoriteUI.emtyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  deleteTask(data_ticket_id) {
    const isConfirm = confirm(`Удалить билет?`);
    if (!isConfirm) return isConfirm;
    favorites.deleteEl(data_ticket_id);
    return isConfirm;
  }

  deleteTaskFromHtml(confirm, parent) {
    if (!confirm) return;
    parent.remove();
  }

  showAlert(
    msg,
    type = "https://img.icons8.com/offices/30/000000/hearts.png",
    text_color = "color-blue"
  ) {
    var toastHTML = `<span><img src="${type}"/></span><button class="btn-flat toast-action dropdown-trigger ${text_color}">${msg}</button>`;
    M.toast({ html: toastHTML });
  }
  static emtyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      Добавьте билеты в избранное, чтобы они всегда были под рукой!
     </div>
     `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
    <div class="card ticket-card green lighten-1" data-ticket-id="${ticket.data_ticket_id}">
      <div class="ticket-airline d-flex align-items-center justify-space-between">
        <div class="d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name">${ticket.airline_name}</span>
        </div>
        <a class="waves-effect waves-light btn red lighten-2 delete-btn
        ">delete</a>
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
      </div>
    </div>
  </div>
  `;
  }
}

const favoriteUI = new FavoriteUI();

export default favoriteUI;

import locations from "../store/locations";
import favoriteUI from "../views/favoriteui";

class Favorites {
  constructor(tickets) {
    this.tickets = tickets;
    this._arrFavorites = [];
  }

  clickFavoriteTicket(tickets, id) {
    tickets.forEach((ticket) => {
      if (ticket.data_ticket_id === id) {
        this._arrFavorites.push(ticket);
        favoriteUI.showAlert("Билет добавлен в избранное!");
      } else {
        return;
      }
    });
  }

  get arrFavorites() {
    return this._arrFavorites;
  }

  deleteEl(id) {
    this._arrFavorites.forEach((ticket) => {
      if (ticket.data_ticket_id === id) {
        const position = this._arrFavorites.indexOf(ticket);
        this._arrFavorites.splice(position, 1);
      }
    });
  }
}

const favorites = new Favorites(locations.lastSearch);

export default favorites;

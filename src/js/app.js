import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favorites from "./store/favorites";
import favoriteUI from "./views/favoriteui";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;
  const container = document.querySelector(".tickets-sections .row");
  const btn = favoriteUI.btn;
  let _id = [];

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  container.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("material-icons")) {
      const data_id = e.target.getAttribute("data-ticket-id");

      onClickBtnFavorite(data_id);
    } else if (e.target.classList.contains("delete-btn")) {
      const parent = e.target.closest("[data-ticket-id]");
      const id = parent.dataset.ticketId;
      const confirmed = favoriteUI.deleteTask(id);
      favoriteUI.deleteTaskFromHtml(confirmed, parent);
    } else {
      return;
    }
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    favoriteOnClick();
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteDate(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собрать  данные из инпутов
    ticketsUI.showLoader();
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    // CODE,  CODE, 2019-09, 2019-10
    console.log(origin, destination, depart_date, return_date);
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

  function onClickBtnFavorite(id) {
    const result = favorites.checkTickets(id);
    if (result) {
      favorites.clickFavoriteTicket(locations.lastSearch, id);
    } else {
      favoriteUI.showAlert(
        "Вы уже добавили этот билет!",
        "https://img.icons8.com/offices/30/000000/cancel.png",
        "color-red"
      );
      return;
    }
  }

  function favoriteOnClick() {
    favoriteUI.renderTickets(favorites.arrFavorites);
  }
});

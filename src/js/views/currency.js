class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency");
    this.dictiontary = {
      USD: "$",
      EUR: "€",
      RUB: "₽",
    };
  }

  get currencyValue() {
    return this.currency.value;
  }

  getCurrencySymbol() {
    return this.dictiontary[this.currencyValue];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;

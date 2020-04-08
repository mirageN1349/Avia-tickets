import {
  getDatePickerInstance,
  getAutocompleteInstance,
} from "../plugins/materialize";

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.depart = document.getElementById("datepicker-depart");
    this.return = document.getElementById("datepicker-return");
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.depart);
    this.returnDatePicker = datePickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    if (!this.origin.value) {
      alert("Введите город отправления!");
      return;
    }
    return this.origin.value;
  }

  get destinationValue() {
    if (!this.destination.value) {
      alert("Введите город прибытия!");
      return;
    }
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatePicker.toString();
  }

  get returnDateValue() {
    return this.returnDatePicker.toString();
  }

  setAutocompleteDate(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}
const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;

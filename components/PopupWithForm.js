import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__input");
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._modalInputs = this._popupForm.querySelectorAll(".modal__field");
  }

  _getInputValues() {
    const inputObject = {};
    this._modalInputs.forEach((element) => {
      inputObject[element.name] = element.value;
    });
    return inputObject;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
    super.setEventListeners();
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
}

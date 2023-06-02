export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._modalExitButton = this._popupElement.querySelector(".modal__exit");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._modalExitButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener(
      "mousedown",
      this._overlayClickCloseListener
    );
  }

  _overlayClickCloseListener = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close(evt.target);
    }
  };
}

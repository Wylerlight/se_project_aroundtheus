// This is for the card and profile info modals. _getInputValues is supposed to assign the inputs that you type in to the newly created card or the profile information.
// It must ad a "submit" handler to the modal as well as a "click" event for the close button
// It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the submit event handler to the form and the click event listener to the close icon.
// The form must reset whenever it is closed DONE

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {}
}

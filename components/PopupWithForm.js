// This is for the card and profile info modals. _getInputValues is supposed to assign the inputs that you type in to the newly created card or the profile information.
// It must add a "submit" handler to the modal as well as a "click" event for the close button
// It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the submit event handler to the form and the click event listener to the close icon.
// The form must reset whenever it is closed DONE

import Popup from "./Popup.js";
import {
  profilePopup,
  profileTitle,
  profileJob,
  titleInput,
  jobInput,
  profileEditButton,
  cardAddButton,
} from "./constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__input");
    this._popupSelector = document.querySelectorAll(popupSelector);
    console.log(this._popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    titleInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
  }

  setEventListeners() {
    profileEditButton.addEventListener("click", () => {
      console.log("edit button clicked");
      this._getInputValues();
      this.open();
      super.setEventListeners();
    });
  }
}

/*
  1.	PopupWithForm – 
    
    a.	_getInputValues() : collects data from the input forms and creates an object from them
    
    b.	setEventListeners() : modifies the setEventListeners from Popup, adds a “submit” event handler to the form as well as a “click” event listener to the close icon. NOTE: There is already code that should attach a “click” listener to the close button of whichever modal is opened
*/

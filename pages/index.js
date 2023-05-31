import Card from "../components/Card.js";
import { openModal, closeModal } from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

//////// Dom Manipulation ////////

const profilePopup = document.querySelector(".profile-modal"); // div wrapper for entire profile edit modal
const profileEditButton = document.querySelector(".profile__button-edit"); // edit button for profile info
const profileModalExitButton = profilePopup.querySelector(".modal__exit"); // exit button (X) for profile edit modal
const profileModalContainer = document.querySelector(".profile-container");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileFormElement =
  profileModalContainer.querySelector(".profile-input"); // form wrapper for profile edit inputs
const titleInput = profileFormElement.querySelector("#modal-description-name");
const jobInput = profileFormElement.querySelector("#modal-description-job");

const cardListElement = document.querySelector(".cards"); // this is the empty <section> that new cards are added to

const cardPopup = document.querySelector(".card-modal"); // wrapper for the entire new card modal
const cardAddButton = document.querySelector(".profile__button-add"); // Button that opens the new card input modal
const cardModalExitButton = cardPopup.querySelector(".modal__exit"); // finds the modal__exit class inside the wrapper containing card-modal
const cardFormElement = cardPopup.querySelector(".card-input"); // form wrapper for new card inputs & submit button
const cardTitleInput = cardFormElement.querySelector(
  "#modal-description-title"
);
const cardUrlInput = cardFormElement.querySelector("#modal-description-url");
const imagePopupElement = document.querySelector(".image"); // the div wrapper for the enlarged image

const imagePopupExit = imagePopupElement.querySelector(".modal__exit"); // close button on enlarged image popup

const settings = {
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                  New Code                                  */
/* -------------------------------------------------------------------------- */

function handleCardClick(data) {
  const imagePopup = new PopupWithImage(".image");
  imagePopup.open(data);
  imagePopup.setEventListeners();
}

/*  Render cards with sepcified template and data  */
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#card-template", handleCardClick);
      const cardElement = newCard.getCard();
      cardSection.addItem(cardElement);
    },
  },
  cardListElement
);

cardSection.renderItems();

/* -------------------------------------------------------------------------- */
/*                            PopupwithForm Section                           */
/* -------------------------------------------------------------------------- */

const profilePopupForm = new PopupWithForm(".modal");
profilePopupForm.setEventListeners();

/*  Validation forms for profile info edit and new card sections  */

const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation(); // uses validation settings from FormValidator.js and applies them to the profile edit inputs

const addCardFormValidator = new FormValidator(settings, cardFormElement);
addCardFormValidator.enableValidation(); // uses validation settings from FormValidator.js and applies them to the new card inputs

/* -------------------------------------------------------------------------- */
/*                                  Old Code                                  */
/* -------------------------------------------------------------------------- */

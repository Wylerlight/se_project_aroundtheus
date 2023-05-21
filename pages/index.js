import Card from "../components/Card.js";
import { openModal, closeModal } from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";

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

const profilePopup = document.querySelector(".profile-modal");
const profileEditButton = document.querySelector(".profile__button-edit");
const profileModalExitButton = profilePopup.querySelector(".modal__exit");
const profileModalContainer = document.querySelector(".profile-container");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileFormElement =
  profileModalContainer.querySelector(".profile-input");
const titleInput = profileFormElement.querySelector("#modal-description-name");
const jobInput = profileFormElement.querySelector("#modal-description-job");

const cardListElement = document.querySelector(".cards");

const cardPopup = document.querySelector(".card-modal");
const cardAddButton = document.querySelector(".profile__button-add");
const cardModalExitButton = cardPopup.querySelector(".modal__exit");
const cardFormElement = cardPopup.querySelector(".card-input");
const cardTitleInput = cardFormElement.querySelector(
  "#modal-description-title"
);
const cardUrlInput = cardFormElement.querySelector("#modal-description-url");
const cardSubmitButton = cardFormElement.querySelector(".card-submit-button");
const imagePopupElement = document.querySelector(".image");

const imagePopupExit = imagePopupElement.querySelector(".image__exit");

/////////////////////////

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getCard();
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = titleInput.value;
  profileJob.textContent = jobInput.value;
  new closeModal(profilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardInputList = Array.from(
    cardFormElement.querySelectorAll(settings.inputSelector)
  );

  new renderCard({ name, link }, cardListElement);
  cardFormElement.reset();
  FormValidator._toggleButtonState(cardInputList, cardSubmitButton, settings);
  new closeModal(cardPopup);
}

profileEditButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  new openModal(profilePopup);
});

profileModalExitButton.addEventListener(
  "click",
  () => new closeModal(profilePopup)
);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => new renderCard(cardData, cardListElement));

cardAddButton.addEventListener("click", () => new openModal(cardPopup));

cardModalExitButton.addEventListener("click", () => new closeModal(cardPopup));

cardFormElement.addEventListener("submit", handleAddCardFormSubmit);

imagePopupExit.addEventListener("click", () => {
  new closeModal(imagePopupElement);
});

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    new closeModal(evt.target);
  }
}

imagePopupElement.addEventListener("mousedown", closeModalOnRemoteClick);
profilePopup.addEventListener("mousedown", closeModalOnRemoteClick);
cardPopup.addEventListener("mousedown", closeModalOnRemoteClick);

const settings = {
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};
const editProfileSelector = profilePopup.querySelector(".modal__input");
const addCardFormSelector = cardPopup.querySelector(".modal__input");

const editFormValidator = new FormValidator(settings, editProfileSelector);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardFormSelector);
addCardFormValidator.enableValidation();

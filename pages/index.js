import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

/* -------------------------------------------------------------------------- */
/*                       Constants : Temporary Placement                      */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector(".profile__button-edit"); // edit button for profile info
const profileModalContainer = document.querySelector(".profile-container");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileFormElement =
  profileModalContainer.querySelector(".profile-input"); // form wrapper for profile edit inputs

const cardListElement = document.querySelector(".cards"); // this is the empty <section> that new cards are added to

const cardPopup = document.querySelector(".card-modal"); // wrapper for the entire new card modal
const cardFormElement = cardPopup.querySelector(".card-input"); // form wrapper for new card inputs & submit button

const settings = {
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                              Popup Card Image                              */
/* -------------------------------------------------------------------------- */

function handleCardClick(data) {
  const imagePopup = new PopupWithImage(".image");
  imagePopup.open(data);
  imagePopup.setEventListeners();
}

/* -------------------------------------------------------------------------- */
/*                         Initial Card Render Section                        */
/* -------------------------------------------------------------------------- */

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
/*                          Form Popup : Edit Profile                         */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo(profileTitle, profileJob);

const profilePopupForm = new PopupWithForm(".profile-modal", (inputValues) => {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
});

profileEditButton.addEventListener("click", () => {
  profilePopupForm.setEventListeners();
  profilePopupForm.open();
});

/* -------------------------------------------------------------------------- */
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(settings, cardFormElement);
addCardFormValidator.enableValidation();

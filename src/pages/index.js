import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const initialCards = [
  {
    title: "Lago di Braies",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    title: "Vanoise National Park",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Latemar",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Bald Mountains",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Lake Louise",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Yosemite Valley",
    url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
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
const titleInput = profileFormElement.querySelector("#modal-description-name");
const jobInput = profileFormElement.querySelector("#modal-description-job");
const cardAddButton = document.querySelector(".profile__button-add");

const settings = {
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};

const renderCard = (item) => {
  const addNewCard = new Card(item, "#card-template", handleCardClick);
  const cardElement = addNewCard.getCard();
  cardSection.addItem(cardElement);
};

/* -------------------------------------------------------------------------- */
/*                              Popup Card Image                              */
/* -------------------------------------------------------------------------- */
const imagePopup = new PopupWithImage(".image");

function handleCardClick(data) {
  imagePopup.open(data);
  imagePopup.setEventListeners();
  imagePopup.overlayClickCloseListener();
}

/* -------------------------------------------------------------------------- */
/*                         Initial Card Render Section                        */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards"
);

cardSection.renderItems();

/* -------------------------------------------------------------------------- */
/*                          Form Popup : Edit Profile                         */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
});

const profilePopupForm = new PopupWithForm(".profile-modal", (inputValues) => {
  userInfo.setUserInfo(inputValues);
  profilePopupForm.close();
});
profilePopupForm.setEventListeners();
profilePopupForm.overlayClickCloseListener();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  titleInput.value = userData.userName;
  jobInput.value = userData.userJobDescription;
  editFormValidator.toggleButtonState();
  profilePopupForm.open();
});

/* -------------------------------------------------------------------------- */
/*                        Form Popup : Adding New Card                        */
/* -------------------------------------------------------------------------- */

const newCardPopupForm = new PopupWithForm(".card-modal", (inputValues) => {
  const newCardItem = new Section(
    {
      items: [inputValues],
      renderer: renderCard,
    },
    ".cards"
  );
  newCardItem.renderItems();
  newCardPopupForm.close();
});

cardAddButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopupForm.open();
});
newCardPopupForm.setEventListeners();
newCardPopupForm.overlayClickCloseListener();

/* -------------------------------------------------------------------------- */
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(settings, cardFormElement);
addCardFormValidator.enableValidation();

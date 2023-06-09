import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

/* const initialCards = [
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
]; */

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

const userProfileAvatar = document.querySelector(".profile__avatar");

const newCardNameInput = document.querySelector("#modal-description-title");
const newCardImageUrlInput = document.querySelector("#modal-description-url");

const settings = {
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};

let cardSection;

const renderCard = (item) => {
  const addNewCard = new Card(item, "#card-template", handleCardClick);
  const cardElement = addNewCard.getCard();
  cardSection.addItem(cardElement);
};

/* -------------------------------------------------------------------------- */
/*                                API Constant                                */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "5e7676bf-611c-4ca9-9820-f740c8ee0732",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                              Popup Card Image                              */
/* -------------------------------------------------------------------------- */
const imagePopup = new PopupWithImage(".image");
imagePopup.setEventListeners();

function handleCardClick(data) {
  imagePopup.open(data);
}

/* -------------------------------------------------------------------------- */
/*                         Initial Card Render Section                        */
/* -------------------------------------------------------------------------- */

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: renderCard,
//   },
//   ".cards"
// );

// cardSection.renderItems();

/* -------------------------------------------------------------------------- */
/*                          Form Popup : Edit Profile                         */
/* -------------------------------------------------------------------------- */
function handleProfileFormSubmit() {
  api
    .editProfileInformation({ name: titleInput.value, about: jobInput.value })
    .then((newUserData) => {
      profileTitle.textContent = newUserData.name;
      profileJob.textContent = newUserData.about;
      userProfileAvatar.src = newUserData.avatar;
      userProfileAvatar.alt = newUserData.name;
    });
  profilePopupForm.close();
}

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
});

const profilePopupForm = new PopupWithForm(
  ".profile-modal",
  handleProfileFormSubmit
);
profilePopupForm.setEventListeners();

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

/* const newCardPopupForm = new PopupWithForm(".card-modal", (inputValues) => {
  renderCard(inputValues);
  newCardPopupForm.close();
});
 */

function handleNewCardServerRenderSubmit() {
  api
    .addNewCard({
      name: newCardNameInput.value,
      link: newCardImageUrlInput.value,
    })
    .then(
      api.getInitialCards().then((res) => {
        cardSection = new Section(
          {
            items: res,
            renderer: renderCard,
          },
          ".cards"
        );

        cardSection.renderItems();
      })
    );

  newCardPopupForm.close();
}
/* function handleNewCardServerRenderSubmit() {
  api.addNewCard({
    name: newCardNameInput.value,
    link: newCardImageUrlInput.value,
  });
  api.getInitialCards().then((cardData) => {
    cardSection = new Section(
      {
        items: cardData,
        renderer: renderCard,
      },
      ".cards"
    );

    cardSection.renderItems();
  });
  newCardPopupForm.close();
} */

const newCardPopupForm = new PopupWithForm(
  ".card-modal",
  handleNewCardServerRenderSubmit
);

cardAddButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopupForm.open();
});
newCardPopupForm.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(settings, cardFormElement);
addCardFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  API Stuff                                 */
/* -------------------------------------------------------------------------- */

/* Fetching and rendering card data from server */
api.getInitialCards().then((cardData) => {
  cardSection = new Section(
    {
      items: cardData,
      renderer: renderCard,
    },
    ".cards"
  );

  cardSection.renderItems();
});

/* Fetch and displaying User name, job bio, and profile picture */
api.getUserInformation().then((userData) => {
  profileTitle.textContent = userData.name;
  profileJob.textContent = userData.about;
  userProfileAvatar.src = userData.avatar;
  userProfileAvatar.alt = userData.name;
});

fetch("https://around.nomoreparties.co/v1/group-12/cards", {
  headers: {
    authorization: "5e7676bf-611c-4ca9-9820-f740c8ee0732",
    "Content-Type": "application/json",
  },
})
  .then((result) => result.json())
  .then((resp) => {
    console.log(resp);
  });

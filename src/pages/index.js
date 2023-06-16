import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDeleteVerify from "../components/PopupCardDeleteVerify.js";
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

const submitDeleteCardContainer = document.querySelector(
  ".card-delete-container"
);

const profileAvatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarChangeContainer = document.querySelector(".avatar__modal");
const avatarFormElement = avatarChangeContainer.querySelector(
  ".avatar__image-input"
);
const avatarChangeSaveButton = avatarChangeContainer.querySelector(
  "#modal-avatar-image-save"
);
const avatarImageInput =
  avatarChangeContainer.querySelector("#modal-avatar-url");

const settings = {
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                            MODAL SUBMIT BUTTONS                            */
/* -------------------------------------------------------------------------- */

const submitButtonEditProfileInfo = document.querySelector(
  "#modal-edit-profile-button"
);
const submitButtonAddNewCard = document.querySelector("#modal-add-card-button");
const submitButtonChangeAvatar = document.querySelector(
  "#modal-avatar-image-save"
);

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

let cardSection;
let userId;

/* -------------------------------------------------------------------------- */
/*                          Verify Delete Card Modal                          */
/* -------------------------------------------------------------------------- */

const cardVerifyDelete = new PopupCardDeleteVerify(".card-delete-verify");
cardVerifyDelete.setEventListeners();

const handleDeleteCard = (cardId, element) => {
  cardVerifyDelete.setSubmitAction(() => {
    api
      .deleteCardRequest(cardId)
      .then(element.remove())
      .then(cardVerifyDelete.close());
  });
};

const handleCardLike = (card) => {
  if (card.cardIsLiked()) {
    api.likesCountRemove(card._cardId).then((res) => {
      card.updateLike(res);
    });
  } else {
    api.likesCountAdd(card._cardId).then((res) => {
      card.updateLike(res);
    });
  }
};

const renderCard = (item) => {
  const addNewCard = new Card(
    item,
    "#card-template",
    handleCardClick,
    userId,
    handleDeleteCard,
    handleCardLike
  );
  const cardElement = addNewCard.getCard();
  cardSection.addItem(cardElement);
};

/* -------------------------------------------------------------------------- */
/*                              Popup Card Image                              */
/* -------------------------------------------------------------------------- */
const imagePopup = new PopupWithImage(".image");
imagePopup.setEventListeners();

function handleCardClick(data) {
  imagePopup.open(data);
}

/* -------------------------------------------------------------------------- */
/*                          Form Popup : Edit Profile                         */
/* -------------------------------------------------------------------------- */
function handleProfileFormSubmit() {
  submitButtonEditProfileInfo.textContent = "Saaving...";
  // select submit button on form change text content to Saving...
  api
    .editProfileInformation({ name: titleInput.value, about: jobInput.value })
    .then((newUserData) => {
      profileTitle.textContent = newUserData.name;
      profileJob.textContent = newUserData.about;
      userProfileAvatar.src = newUserData.avatar;
      userProfileAvatar.alt = newUserData.name;
    })
    .finally(() => {
      submitButtonEditProfileInfo.textContent = "Save";
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

function handleNewCardServerRenderSubmit() {
  submitButtonAddNewCard.textContent = "Saving...";
  api
    .addNewCard({
      name: newCardNameInput.value,
      link: newCardImageUrlInput.value,
      _id: userId,
    })
    .then((cardData) => {
      cardSection = new Section(
        {
          items: [cardData],
          renderer: renderCard,
        },
        ".cards"
      );

      cardSection.renderItems();
    })
    .finally(() => {
      submitButtonAddNewCard.textContent = "Create";
    });

  newCardPopupForm.close();
}

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
const deleteCardVerifyValidator = new FormValidator(
  settings,
  submitDeleteCardContainer
);
deleteCardVerifyValidator.enableValidation();
const avatarImageFormValidator = new FormValidator(settings, avatarFormElement);
avatarImageFormValidator.enableValidation();

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
  userId = userData._id;
  profileTitle.textContent = userData.name;
  profileJob.textContent = userData.about;
  userProfileAvatar.src = userData.avatar;
});

/* -------------------------------------------------------------------------- */
/*                      Avatar picture change popup form                      */
/* -------------------------------------------------------------------------- */

function handleAvatarImageServerSubmit() {
  submitButtonChangeAvatar.textContent = "Saving...";
  api
    .updateProfilePicture({ avatar: avatarImageInput.value })
    .then((response) => {
      console.log(response);
      userProfileAvatar.src = response.avatar;
    })
    .finally(() => {
      submitButtonChangeAvatar.textContent = "Save";
    });
  avatarChangeFormPoup.close();
}

const avatarChangeFormPoup = new PopupWithForm(
  ".avatar__modal",
  handleAvatarImageServerSubmit
);

profileAvatarEditButton.addEventListener("click", () => {
  avatarImageFormValidator.toggleButtonState();
  avatarChangeFormPoup.open();
});
avatarChangeFormPoup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                          Random API Fetch checkers                         */
/* -------------------------------------------------------------------------- */

fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "5e7676bf-611c-4ca9-9820-f740c8ee0732",
    "Content-Type": "application/json",
  },
})
  .then((result) => result.json())
  .then((resp) => {
    console.log(resp);
  });

/* fetch(
  `https://around.nomoreparties.co/v1/group-12/cards/6487619a56407e0828f07930`,
  {
    method: "DELETE",
    headers: {
      authorization: "5e7676bf-611c-4ca9-9820-f740c8ee0732",
      "Content-Type": "application/json",
    },
  }
)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("Done deleting card");
  });
 */

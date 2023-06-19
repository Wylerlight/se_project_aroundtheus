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

/* -------------------------------------------------------------------------- */
/*                          Random API Fetch checkers                         */
/* -------------------------------------------------------------------------- */

/* fetch("https://around.nomoreparties.co/v1/group-12/cards", {
  headers: {
    authorization: "5e7676bf-611c-4ca9-9820-f740c8ee0732",
    "Content-Type": "application/json",
  },
})
  .then((result) => result.json())
  .then((resp) => {
    console.log(resp);
  }); */

/* -------------------------------------------------------------------------- */
/*                       Constants : Temporary Placement                      */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector(".profile__button-edit"); // edit button for profile info
const profileModalContainer = document.querySelector(".profile-container");

const profileFormElement =
  profileModalContainer.querySelector(".profile-input"); // form wrapper for profile edit inputs

const cardPopup = document.querySelector(".card-modal"); // wrapper for the entire new card modal
const cardFormElement = cardPopup.querySelector(".card-input"); // form wrapper for new card inputs & submit button
// const cardTrashButton = document.querySelector(".card__trash-button");

const titleInput = profileFormElement.querySelector("#modal-description-name");
const jobInput = profileFormElement.querySelector("#modal-description-job");
const cardAddButton = document.querySelector(".profile__button-add");

const userProfileAvatar = document.querySelector(".profile__avatar");

const profileAvatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarChangeContainer = document.querySelector(".avatar__modal");
const avatarFormElement = avatarChangeContainer.querySelector(
  ".avatar__image-input"
);

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

let userId;

/* -------------------------------------------------------------------------- */
/*                            Render Card Function                            */
/* -------------------------------------------------------------------------- */

const renderCard = (item) => {
  const addNewCard = new Card(
    item,
    "#card-template",
    handleCardClick,
    userId,
    handleCardLike,
    cardTrashButtonVerify,
    handleDeleteCard
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
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

/* const editFormValidator = new FormValidator(settings, ".profile-input");
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(settings, ".card-input");
addCardFormValidator.enableValidation();

const avatarImageFormValidator = new FormValidator(settings, avatarFormElement);
avatarImageFormValidator.enableValidation(); */

/* -------------------------------------------------------------------------- */
/*                           New Form Validators                              */
/* -------------------------------------------------------------------------- */

const formValidators = {};
console.log(formValidators);
console.log(formValidators["modal__field"]);

function validationEabling(settings) {
  const formList = Array.from(
    document.querySelectorAll(settings.inputSelector)
  );
  formList.forEach((element) => {
    const validator = new FormValidator(settings, element);
    const formName = element.getAttribute("id");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
validationEabling(settings);

/* -------------------------------------------------------------------------- */
/*              WORK SECTION BEGINS HERE FOR REVIEWER SUBMISSION              */
/* -------------------------------------------------------------------------- */
////////////////////////////////////////////////////////////////////////////////

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */

const classUserInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar",
});

const cardSection = new Section({ renderer: renderCard }, ".cards");

/* -------------------------------------------------------------------------- */
/*    Initial page load: Setting User Information and Render Initial Cards    */
/* -------------------------------------------------------------------------- */

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    classUserInfo.setUserInfo(userData);
    cardSection.renderItems(cardData);
  })
  .catch((err) => {
    console.error(err);
  });

/* -------------------------------------------------------------------------- */
/*                        Form: Changing Avatar Picture                       */
/* -------------------------------------------------------------------------- */

function handleAvatarImageServerSubmit(data) {
  submitButtonChangeAvatar.textContent = "Saving...";
  api
    .updateProfilePicture(data)
    .then((response) => {
      userProfileAvatar.src = response.avatar;
    })
    .then(() => {
      avatarChangeFormPoup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButtonChangeAvatar.textContent = "Save";
    });
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
/*                           Form: Adding New Cards                           */
/* -------------------------------------------------------------------------- */

function handleNewCardServerRenderSubmit(data) {
  submitButtonAddNewCard.textContent = "Saving...";
  api
    .addNewCard(data)
    .then((cardData) => {
      cardSection.renderItems([cardData]);
    })
    .then(() => {
      newCardPopupForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButtonAddNewCard.textContent = "Create";
    });
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
/*                   Form: Editing Profile User Information                   */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(data) {
  submitButtonEditProfileInfo.textContent = "Saving...";
  api
    .editProfileInformation(data)
    .then((newUserData) => {
      classUserInfo.setUserInfo(newUserData);
    })
    .then(() => {
      profilePopupForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButtonEditProfileInfo.textContent = "Save";
    });
}

const profilePopupForm = new PopupWithForm(
  ".profile-modal",
  handleProfileFormSubmit
);
profilePopupForm.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = classUserInfo.getUserInfo();

  titleInput.value = userData.userName;
  jobInput.value = userData.userJobDescription;
  editFormValidator.toggleButtonState();
  profilePopupForm.open();
});

/* -------------------------------------------------------------------------- */
/*                          Card Like/Unlike Function                         */
/* -------------------------------------------------------------------------- */

function handleCardLike(card) {
  if (card.cardIsLiked()) {
    api
      .likesCountRemove(card._cardId)
      .then((res) => {
        card.updateLike(res);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likesCountAdd(card._cardId)
      .then((res) => {
        card.updateLike(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/* -------------------------------------------------------------------------- */
/*                          Verify Delete Card Modal                          */
/* -------------------------------------------------------------------------- */

const cardVerifyDelete = new PopupCardDeleteVerify(
  ".card-delete-verify",
  handleDeleteCard
);
cardVerifyDelete.setEventListeners();

function handleDeleteCard(cardId, element) {
  cardVerifyDelete.setSubmitAction(() => {
    api
      .deleteCardRequest(cardId)
      .then(() => {
        element.remove();
      })
      .then(() => {
        cardVerifyDelete.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function cardTrashButtonVerify() {
  cardVerifyDelete.open();
}

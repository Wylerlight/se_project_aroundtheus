import {
  profileEditButton,
  profileModalContainer,
  profileFormElement,
  titleInput,
  jobInput,
  cardAddButton,
  userProfileAvatar,
  profileAvatarEditButton,
  settings,
  submitButtonEditProfileInfo,
  submitButtonAddNewCard,
  submitButtonChangeAvatar,
  submitButtonDeleteCard,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupCardDeleteVerify from '../components/PopupCardDeleteVerify.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';

/* -------------------------------------------------------------------------- */
/*                                API Constant                                */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '5e7676bf-611c-4ca9-9820-f740c8ee0732',
    'Content-Type': 'application/json',
  },
});

let userId;

/* -------------------------------------------------------------------------- */
/*                            Render Card Function                            */
/* -------------------------------------------------------------------------- */

const renderCard = (item) => {
  const addNewCard = new Card(
    item,
    '#card-template',
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
const imagePopup = new PopupWithImage('.image');
imagePopup.setEventListeners();

function handleCardClick(data) {
  imagePopup.open(data);
}

/* -------------------------------------------------------------------------- */
/*              WORK SECTION BEGINS HERE FOR REVIEWER SUBMISSION              */
/* -------------------------------------------------------------------------- */
////////////////////////////////////////////////////////////////////////////////

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */

const classUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar',
});

const cardSection = new Section({ renderer: renderCard }, '.cards');

/* -------------------------------------------------------------------------- */
/*                           New Form Validators                              */
/* -------------------------------------------------------------------------- */

const formValidators = {};

function validationEabling(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((element) => {
    const validator = new FormValidator(settings, element);
    const formName = element.getAttribute('id');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
validationEabling(settings);

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
  avatarChangeFormPoup.renderLoading(data);
  api
    .updateProfilePicture(data)
    .then((response) => {
      classUserInfo.setUserInfo(response);
    })
    .then(() => {
      avatarChangeFormPoup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarChangeFormPoup.renderLoading(false);
    });
}

const avatarChangeFormPoup = new PopupWithForm(
  '.avatar__modal',
  handleAvatarImageServerSubmit
);

profileAvatarEditButton.addEventListener('click', () => {
  formValidators['avatar-form'].toggleButtonState();
  avatarChangeFormPoup.open();
});
avatarChangeFormPoup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                           Form: Adding New Cards                           */
/* -------------------------------------------------------------------------- */

function handleNewCardServerRenderSubmit(data) {
  newCardPopupForm.renderLoading(data);
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
      newCardPopupForm.renderLoading(false);
    });
}

const newCardPopupForm = new PopupWithForm(
  '.card-modal',
  handleNewCardServerRenderSubmit
);

cardAddButton.addEventListener('click', () => {
  formValidators['new-card-form'].toggleButtonState();
  newCardPopupForm.open();
});
newCardPopupForm.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                   Form: Editing Profile User Information                   */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(data) {
  profilePopupForm.renderLoading(data);
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
      profilePopupForm.renderLoading(false);
    });
}

const profilePopupForm = new PopupWithForm(
  '.profile-modal',
  handleProfileFormSubmit
);
profilePopupForm.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userData = classUserInfo.getUserInfo();

  titleInput.value = userData.userName;
  jobInput.value = userData.userJobDescription;
  formValidators['profile-input-form'].toggleButtonState();
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
  '.card-delete-verify',
  handleDeleteCard
);
cardVerifyDelete.setEventListeners();

function handleDeleteCard(cardId, element) {
  cardVerifyDelete.setSubmitAction(() => {
    cardVerifyDelete.renderLoading(cardId);

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
      })
      .finally(() => {
        cardVerifyDelete.renderLoading(false);
      });
  });
}

function cardTrashButtonVerify() {
  cardVerifyDelete.open();
}

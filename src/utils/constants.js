/* -------------------------------------------------------------------------- */
/*                        Constants for use in index.js                       */
/* -------------------------------------------------------------------------- */
export const profileEditButton = document.querySelector(
  ".profile__button-edit"
); // edit button for profile info

export const profileModalContainer =
  document.querySelector(".profile-container");

export const profileFormElement =
  profileModalContainer.querySelector(".profile-input"); // form wrapper for profile edit inputs

export const titleInput = profileFormElement.querySelector(
  "#modal-description-name"
);
export const jobInput = profileFormElement.querySelector(
  "#modal-description-job"
);
export const cardAddButton = document.querySelector(".profile__button-add");

export const userProfileAvatar = document.querySelector(".profile__avatar");

export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-edit"
);

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_type_error",
  errorClass: "modal__error_visible",
};
/* -------------------------------------------------------------------------- */
/*                            MODAL SUBMIT BUTTONS                            */
/* -------------------------------------------------------------------------- */

export const submitButtonEditProfileInfo = document.querySelector(
  "#modal-edit-profile-button"
);
export const submitButtonAddNewCard = document.querySelector(
  "#modal-add-card-button"
);

export const submitButtonChangeAvatar = document.querySelector(
  "#modal-avatar-image-save"
);

export const submitButtonDeleteCard = document.querySelector(
  "#modal-verify-delete-card-button"
);

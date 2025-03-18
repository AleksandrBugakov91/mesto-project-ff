import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCards, toggleLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  checkResponse,
  getProfileInfo,
  getCards,
  transferProfileInfo,
  addNewCard,
  updatedProfileAvatar,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");
const editProfile = document.querySelector(".popup");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonSaveProfileChanges = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const formEditProfilePopup = popupEditProfile.querySelector(".popup__form");
const inputName = formEditProfilePopup.querySelector(".popup__input_type_name");
const inputDescription = formEditProfilePopup.querySelector(
  ".popup__input_type_description"
);
const nameProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const formAddNewCard = popupAddCard.querySelector(".popup__form");
const nameNewCard = formAddNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkImageNewCard = formAddNewCard.querySelector(".popup__input_type_url");
const profileimage = document.querySelector(".profile__image");
let userId;
const profileAvatar = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const inputAvatarLink = formEditAvatar.querySelector("#input_avatar-link");
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');

  const buttonClosePopup = popup.querySelector('.popup__close');
  if (buttonClosePopup) {
    buttonClosePopup.addEventListener('click', () => closePopup(popup));
  }
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup)
    }
  });
});

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getCards()])
  .then(([profileData, cards]) => {

    nameProfile.textContent = profileData.name;
    descriptionProfile.textContent = profileData.about;
    profileimage.style.backgroundImage = `url(${profileData.avatar})`;
    userId = profileData._id;

    cards.forEach((item) => {
      const templates = createCards(item, openImagePopup, userId);
      placesList.append(templates);
    });
  })
  .catch((err) => {
    console.log("Ошибка в Promise.all", err);
  });

function openImagePopup(item) {
  popupImageContent.src = item.link;
  popupImageContent.alt = item.name;
  popupImageCaption.textContent = item.name;

  openPopup(popupImage);
}

function submitProfileForm(evt) {
  evt.preventDefault();

  const submitButton = formEditProfilePopup.querySelector(".popup__button");
  const submitButtonText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  transferProfileInfo(inputName.value, inputDescription.value)
    .then((data) => {
      nameProfile.textContent = data.name;
      descriptionProfile.textContent = data.about;

      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных профиля:", err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
}

formEditProfilePopup.addEventListener("submit", submitProfileForm);
buttonSaveProfileChanges.addEventListener("click", () =>
  openPopup(popupAddCard)
);
buttonEditProfile.addEventListener("click", () => {
  openPopup(
    popupEditProfile,
    nameProfile,
    descriptionProfile,
    inputName,
    inputDescription
  );
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;

  clearValidation(formEditProfilePopup, validationConfig);

  openPopup(popupEditProfile);
});

profileAvatar.addEventListener("click", () => {
  openPopup(popupEditAvatar);
});

formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const avatarLink = inputAvatarLink.value;
  const submitButton = formEditAvatar.querySelector(".popup__button");
  const submitButtonText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  updatedProfileAvatar(avatarLink)
    .then((data) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${data.avatar})`;

      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
});

function submitNewCardForm(evt) {
  evt.preventDefault();

  const submitButton = formEditProfilePopup.querySelector(".popup__button");
  const submitButtonText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  addNewCard(nameNewCard.value, linkImageNewCard.value)
    .then((data) => {
      const cardElement = createCards(data, openImagePopup, userId);
      placesList.prepend(cardElement);

      formAddNewCard.reset();
      clearValidation(formAddNewCard, validationConfig);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
}

formAddNewCard.addEventListener("submit", submitNewCardForm);

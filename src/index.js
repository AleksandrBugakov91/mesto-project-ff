import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCards, toggleLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

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

function openImagePopup(item) {
  const popupImage = document.querySelector(".popup_type_image");
  const popupImageContent = popupImage.querySelector(".popup__image");
  const popupImageCaption = popupImage.querySelector(".popup__caption");

  popupImageContent.src = item.link;
  popupImageContent.alt = item.link;
  popupImageCaption.textContent = item.name;

  openPopup(popupImage);
};

function addTemplates(cards) {
  cards.forEach(function (item) {
    const templates = createCards(item, openImagePopup);
    placesList.append(templates);
  });
}

addTemplates(initialCards);

function submitProfileForm(evt) {
  evt.preventDefault();

  const popupElement = evt.target.closest(".popup");
  const nameValue = inputName.value;
  const descriptionValue = inputDescription.value;

  nameProfile.textContent = nameValue;
  descriptionProfile.textContent = descriptionValue;

  closePopup(popupElement);
}

formEditProfilePopup.addEventListener("submit", submitProfileForm);
buttonSaveProfileChanges.addEventListener("click", () => openPopup(popupAddCard));
buttonEditProfile.addEventListener("click", () => {
  openPopup(
    popupEditProfile,
    nameProfile,
    descriptionProfile,
    inputName,
    inputDescription
  )
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
  
  openPopup(popupEditProfile);
});

function submitNewCardForm(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameNewCard.value,
    link: linkImageNewCard.value,
  };

  const cardElement = createCards(newCard, openImagePopup);
  placesList.prepend(cardElement);

  formAddNewCard.reset();
  closePopup(popupAddCard);
}

formAddNewCard.addEventListener("submit", submitNewCardForm);
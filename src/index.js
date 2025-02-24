import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCards, toggleLike } from "./components/card.js";
import { openPopup, closePopup,closeByOverlayClick } from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const editProfile = document.querySelector(".popup");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
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
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const profileCloseButtons = document.querySelectorAll(".popup__close");

profileCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      if (popup) {
          closePopup(popup);
      }
  });
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", closeByOverlayClick);
});

function openImagePopup(item) {
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
buttonOpenAddCardForm.addEventListener("click", () => openPopup(popupAddCard));
function openEditProfileForm() {
  inputName.value = nameProfile.textContent;
  inputDescription.value = descriptionProfile.textContent;
  
  openPopup(popupEditProfile);
}
buttonEditProfile.addEventListener("click", openEditProfileForm);

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
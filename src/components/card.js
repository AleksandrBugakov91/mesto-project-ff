import { addLike, deleteLike } from "./api.js";
import { deleteCard } from "./api.js";

function toggleLike(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    deleteLike(cardId)
      .then((updatedItem) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = updatedItem.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка добавления лайка:", err);
      });
  } else {
    addLike(cardId)
      .then((updatedItem) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = updatedItem.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка удаления лайка:", err);
      });
  }
}

function likeButtonClick(evt) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest('.places__item');
  const likeCounter = cardElement.querySelector('.card_like-counter');
  const cardId = cardElement.dataset.cardId;

  toggleLike(cardId, likeButton, likeCounter);
}

function createCards(item, openImagePopup, userId) {
  const templates = document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);

  templates.dataset.cardId = item._id;
 
  const cardName = templates.querySelector(".card__title");
  const cardImage = templates.querySelector(".card__image");
  const deleteButton = templates.querySelector(".card__delete-button");
  const buttonLike = templates.querySelector(".card__like-button");
  const likeCounter = templates.querySelector(".card_like-counter");

  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  likeCounter.textContent = item.likes.length;

  if (item.likes.some((like) => like._id === userId)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", likeButtonClick);

  if (item.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => {
    deleteCard(item._id)
      .then(() => {
        templates.remove();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки:", err);
      });
  });

  cardImage.addEventListener("click", () => openImagePopup(item));

  return templates;
}

export { createCards, toggleLike};
function createCards(item, openImagePopup) {
    const templates = document
      .querySelector("#card-template")
      .content.querySelector(".places__item")
      .cloneNode(true);
  
    const cardName = templates.querySelector(".card__title");
    const cardImage = templates.querySelector(".card__image");
    const deleteButton = templates.querySelector(".card__delete-button");
    const buttonLike = templates.querySelector(".card__like-button");
  
    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
  
    deleteButton.addEventListener("click", function () {
      const removeItem = deleteButton.closest(".places__item");
      removeItem.remove();
    });

  
    if (buttonLike) {
      buttonLike.addEventListener("click", toggleLike);
    }
  
    cardImage.addEventListener("click", () => openImagePopup(item));
  
    return templates;
  }
  
  function toggleLike(evt) {
   if (evt.target && evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  }
  
  export { createCards, toggleLike };
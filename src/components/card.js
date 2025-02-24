function deleteCard(card) { 
  card.remove() 
} 

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
  
    deleteButton.addEventListener("click", () => deleteCard(templates));

    buttonLike.addEventListener('click', () => {
      toggleLike(buttonLike);
    });
      
    cardImage.addEventListener("click", () => openImagePopup(item));
  
    return templates;
  }
  
  function toggleLike(event) {
    event.classList.toggle('card__like-button_is-active');
  };
  
  export { createCards, toggleLike, deleteCard };
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function deleteCard(card) {
   card.remove()
}

function createCard(item) {
    const template = document
      .querySelector("#card-template")
      .content.querySelector(".places__item")
      .cloneNode(true);
  
    const cardName = template.querySelector(".card__title");
    const cardImage = template.querySelector(".card__image");
    const deleteButton = template.querySelector(".card__delete-button");
  
    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
  
    deleteButton.addEventListener("click", () => deleteCard(template))

    return template;
  }

  const placesList = document.querySelector(".places__list");
  
  function addTemplates(cards) {
    cards.forEach(function (item) {
      const template = createCard(item);
  
      placesList.append(template);
    });
  }
  
  addTemplates(initialCards);

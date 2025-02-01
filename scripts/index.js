// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCards(item) {
    const templates = document
      .querySelector("#card-template")
      .content.querySelector(".places__item")
      .cloneNode(true);
  
    const cardName = templates.querySelector(".card__title");
    const cardImage = templates.querySelector(".card__image");
    const deleteButton = templates.querySelector(".card__delete-button");
  
    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
  
    deleteButton.addEventListener("click", function () {
      const removeItem = deleteButton.closest(".places__item");
      removeItem.remove();
    });
  
    return templates;
  }
  
  const placesList = document.querySelector(".places__list");
  
  function addTemplates(cards) {
    cards.forEach(function (item) {
      const templates = createCards(item);
  
      placesList.append(templates);
    });
  }
  
  addTemplates(initialCards);

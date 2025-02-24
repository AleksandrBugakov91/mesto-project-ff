function openPopup(popup) { 
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc); 
};

function closePopup(popup) { 
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc);
  popup.addEventListener("mousedown", closeByOverlayClick); 
};

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
      const popupIsOpened = document.querySelector(".popup_is-opened");
      if (popupIsOpened) {
          closePopup(popupIsOpened);
      }
  }
};

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

export {openPopup, closePopup,closeByOverlayClick}
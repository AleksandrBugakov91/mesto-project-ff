function openPopup(popupElement) {
    popupElement.classList.add("popup_is-opened");
    popupElement.classList.add("popup_is-animated"); 
  
    const buttonClosePopup = popupElement.querySelector(".popup__close");
  
    function handleClickButtonClose() {
      closePopup(popupElement);
    }
    
    function handleClickOverlay(evt) {
      if (evt.target === popupElement) {
      closePopup(popupElement);
      }
    }
  
    buttonClosePopup.addEventListener("click", handleClickButtonClose);
    popupElement.addEventListener("click", handleClickOverlay);
    document.addEventListener("keydown", handlekeyEscape);
  
    popupElement._handleCloseClick = handleClickButtonClose;
    popupElement._handleOverlayClick = handleClickOverlay;
  }
  
  function closePopup(popupElement) {
    popupElement.classList.remove("popup_is-opened");
    popupElement.classList.remove("popup_is-animated"); 
  
    const buttonClosePopup = popupElement.querySelector(".popup__close");
  
    buttonClosePopup.removeEventListener("click",  popupElement._handleCloseClick);
    popupElement.removeEventListener("click", popupElement._handleOverlayClick);
    document.removeEventListener("keydown", handlekeyEscape);
  
    delete popupElement._handleCloseClick
    delete popupElement._handleOverlayClick
  }
  
  function handlekeyEscape(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    }
  }
  
  export { openPopup, closePopup };
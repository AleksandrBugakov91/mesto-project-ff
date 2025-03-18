const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-34",
    headers: {
      authorization: "a826312c-2a33-4551-a1d6-8fc7d34d709c",
      "Content-Type": "application/json",
    },
  };
  
  export function checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
 
  export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers,
    })
      .then(checkResponse);
  }

  export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers,
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const transferProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
 
  export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const updatedProfileAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
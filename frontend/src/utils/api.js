// Kittygram API module

export const api = {
  signIn(credentials) {
    return fetch("/api/token/login/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(credentials)
    }).then(res => res.ok ? res.json() : Promise.reject(res));
  }
};

export const registerUser = (userData) => {
  return fetch("/api/users/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData)
  }).then(res => res.ok ? res.json() : Promise.reject(res));
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
};

export const getCards = (token) => {
  return fetch("/api/cats/", {
    headers: {"Authorization": `Token ${token}`}
  }).then(res => res.json());
};

export const getCard = (id, token) => {
  return fetch(`/api/cats/${id}/`, {
    headers: {"Authorization": `Token ${token}`}
  }).then(res => res.json());
};

export const sendCard = (cardData, token) => {
  return fetch("/api/cats/", {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cardData)
  }).then(res => res.json());
};

export const updateCard = (id, cardData, token) => {
  return fetch(`/api/cats/${id}/`, {
    method: "PATCH",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cardData)
  }).then(res => res.json());
};

export const deleteCard = (id, token) => {
  return fetch(`/api/cats/${id}/`, {
    method: "DELETE",
    headers: {"Authorization": `Token ${token}`}
  });
};

export const getAchievements = (token) => {
  return fetch("/api/achievements/", {
    headers: {"Authorization": `Token ${token}`}
  }).then(res => res.json());
};

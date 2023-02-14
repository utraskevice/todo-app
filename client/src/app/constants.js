const API_DOMAIN = 'http://localhost:8000';

export const API = {
  login: `${API_DOMAIN}/login`,
  signup: `${API_DOMAIN}/signup`,
  tasks: `${API_DOMAIN}/todo/`,
  singleTask: (id) => `${API_DOMAIN}/todo/${id}`,
  toggleFavorite: (id) => `${API_DOMAIN}/favorite/${id}`,
  userInfo: (id) => `${API_DOMAIN}/user/${id}`,
};

export const AUTH_TOKEN_STORAGE_KEY = 'AUTH_TOKEN_STORAGE_KEY';

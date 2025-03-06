import axios from "axios";

const API_URL = "http://localhost:5000";

export const register = async (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });

  console.log("Login response:", response.data); // Логируем ответ сервера

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  } else {
    console.error("Token or userId not found in response");
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const updateAvatar = async (avatar, token) => {
  try {
    console.log("Token before request:", token); //
    const response = await axios.post(
      `${API_URL}/profile`,
      { avatar },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.log("❌ Error from updating avatar:");
    if (error.response) {
      console.log("Status Code:", error.response.status); // 👉 Код ошибки (403, 400, 500?)
      console.log("Response Data:", error.response.data); // 👉 Ответ сервера (какой текст ошибки?)
    } else if (error.request) {
      console.log("No response received:", error.request); // 👉 Сервер не ответил
    } else {
      console.log("Request setup error:", error.message); // 👉 Ошибка в коде запроса
    }
    return null;
  }
};

export const getUserAvatar = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching profile:", error);
    return null;
  }
};

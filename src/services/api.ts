import axios from "axios";

export function API(baseURL: string, token?: string) {
  if (token) {
    return axios.create({
      baseURL: `${baseURL}/zenithar/`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "24022023",
        Authorization: `Bearer ${token}`,
      },
      timeout: 20000,
    });
  } else {
    return axios.create({
      baseURL: `${baseURL}/zenithar/`,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "24022023",
      },
      timeout: 20000,
    });
  }
}

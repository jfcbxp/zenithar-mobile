import axios from "axios";

export function API(baseURL: string, token?: string) {
  if (token) {
    return axios.create({
      baseURL: `${baseURL}/zenithar/`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    });
  } else {
    return axios.create({
      baseURL: `${baseURL}/zenithar/`,
      timeout: 5000,
    });
  }
}

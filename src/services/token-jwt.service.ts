import { AuthToken } from "../models/from-api/authtoken.model";
import { API } from "./api";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.provider";

export const useTokenService = () => {
  const authContext = useContext(AuthContext);

  const getToken = async () => {
    let times = 4;
    let secret = Buffer.from(authContext.urlBackend!).toString("base64");

    while (times--) secret = Buffer.from(secret).toString("base64");

    const authToken: AuthToken = {
      uuid: authContext.user?.uid!,
      secret: secret,
    };

    const api = API(authContext.urlBackend!);
    const url: string = `auth/token`;
    return api.post<AuthToken>(url, authToken);
  };

  const getUrl = () => {
    return authContext.urlBackend!;
  };

  return {
    getToken,
    getUrl,
  };
};

import { AxiosResponse } from "axios";
import { AuthToken } from "../models/from-api/authtoken.model";
import { API } from "./api";
import GetSecret from "./auth-secret";

export async function GetTokenJWT(
  uuid: string,
  urlBackend: string
): Promise<AuthToken> {
  const secret = GetSecret(urlBackend);
  const authToken: AuthToken = {
    uuid: uuid,
    secret: secret,
  };
  const api = API(urlBackend);
  const url: string = `auth/token`;
  const response: AxiosResponse<AuthToken> = await api.post<AuthToken>(
    url,
    authToken
  );
  return response.data;
}

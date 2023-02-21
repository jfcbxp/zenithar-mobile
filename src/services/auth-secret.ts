import { Buffer } from "buffer";

export default function GetSecret(URL: string) {
  let token = Buffer.from(URL).toString("base64");
  let times = 4;
  while (times--) token = Buffer.from(token).toString("base64");
  return token;
}

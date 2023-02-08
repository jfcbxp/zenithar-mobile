import { Buffer } from "buffer";

export default function GetSecret(URL: string) {
    let token = ""
    for (let i = 1; i <= 5; i++) {
        if (i == 1) {
            token = Buffer.from(URL).toString('base64');
        } else {
            token = Buffer.from(token).toString('base64');
        }
    }
    return token
}
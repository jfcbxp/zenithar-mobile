import axios from "axios";

export function API(baseURL: string, token?: string) {

    if (token) {
        return axios.create({
            baseURL: `${baseURL}/zenithar/`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        return axios.create({
            baseURL: `${baseURL}/zenithar/`,
        })
    }



}


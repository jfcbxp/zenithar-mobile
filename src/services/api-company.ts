import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/auth.provider";
import { realtime } from "./firebase.service";

export default function api() {
    const authContext = useContext(AuthContext)
    const company = authContext.user?.company
    const [baseURL, setBaseURL] = useState("")

    useEffect(() => {
        async () => {
            await realtime
                .ref("companies")
                .child(company!)
                .once("value")
                .then(async (snapshot) => {
                    setBaseURL(snapshot.val().urlBackend)
                })
        }
    }, [])

    return axios.create({
        baseURL: baseURL
    })
}
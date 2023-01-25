import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/auth.provider";
import { realtime } from "./firebase.service";

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

const api = axios.create({
    baseURL: baseURL
})

export default api
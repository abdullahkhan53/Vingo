import axios from "axios";
import { data } from "react-router-dom";
const serverUrl = "http://localhost:3000/"

export const handleGoogleAuth = async(data) => {
    try {
        const result = await axios.post(`${serverUrl}api/auth/google-auth`, data,
        {withCredentials: true}
        )
        console.log(result);

    } catch (error) {
        console.log("Status : 401  ---  Error in handle google auth", error)
    }
}
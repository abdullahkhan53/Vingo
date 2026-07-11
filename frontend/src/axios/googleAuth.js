import axios from "axios";
import { data } from "react-router-dom";
import { setUserData } from "../redux/userSlice";

const serverUrl = "http://localhost:3000/"


export const handleGoogleAuth = async(data, dispatch) => {
    
    try {
        const result = await axios.post(`${serverUrl}api/auth/google-auth`, data,
        {withCredentials: true}
        )
        dispatch(setUserData(result.data))
        console.log(result.data);

    } catch (error) {
        console.log("Status : 401  ---  Error in handle google auth", error)
        throw error;
    }
}
import axios from "axios";
const serverUrl = "http://localhost:3000/"
import { setUserData } from "../redux/userSlice";

export const handleSignup = async(data, dispatch) => {
    
    try{
        const response = await axios.post(`${serverUrl}api/auth/signup`, data,
         {withCredentials: true})
         console.log(response)
         dispatch(setUserData(response.data))
    } catch (err) {
        throw err;
    }
} 
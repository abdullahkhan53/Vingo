import axios from "axios";

import { setUserData } from "../redux/userSlice";
const serverUrl = "http://localhost:3000/"


export const handleSignin = async(data, dispatch) => {
    
    try{
        const response = await axios.post(`${serverUrl}api/auth/signin`, data,
            {withCredentials: true}
        )
        // console.log(response);
        dispatch(setUserData(response.data))
    } catch (err) {
        throw err;
    }
}
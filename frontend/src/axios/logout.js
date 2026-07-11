import axios from "axios";
const serverUrl = "http://localhost:3000/"
import { setUserData } from "../redux/userSlice";

export const handleLogout = async(dispatch) => {
    try{
        const response = await axios.post(`${serverUrl}api/auth/logout`, {},
            {withCredentials: true}
        )
        dispatch(setUserData(null))
        console.log(response);
    } catch (err) {
        throw err;
    }
}
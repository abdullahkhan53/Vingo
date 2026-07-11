import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const serverUrl = "http://localhost:3000"

function useGenCurrUser() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async() => {
                try{
            const result = await axios.get(`${serverUrl}/api/user/current`, 
                {withCredentials: true}
            )
            dispatch(setUserData(result.data.user))
            console.log("Current User Data:", result.data.user);
        } catch(err){
            return console.log("error in custom hook : ", err)
        }
        }
        fetchUser()
    }, [])
}

export default useGenCurrUser;
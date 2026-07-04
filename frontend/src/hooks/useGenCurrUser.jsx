import { useEffect } from "react";
import axios from "axios";

const serverUrl = "http://localhost:3000"

function useGenCurrUser() {
    useEffect(() => {
        const fetchUser = async() => {
                try{
            const result = await axios.get(`${serverUrl}/api/user/current`, 
                {withCredentials: true}
            )
            console.log(result);
        } catch(err){
            return console.log("error in custom hook : ", err)
        }
        }
        fetchUser()
    }, [])
}

export default useGenCurrUser;
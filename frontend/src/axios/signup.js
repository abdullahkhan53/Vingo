import axios from "axios";

const serverUrl = "http://localhost:3000/"

export const handleSignup = async(data) => {
    try{
        const res = await axios.post(`${serverUrl}api/auth/signup`, data,
         {withCredentials: true})
         console.log(res)
    } catch (err) {
        console.log(err)
    }
} 
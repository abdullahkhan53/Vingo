import axios from "axios";

const serverUrl = "http://localhost:3000/"

export const handleSignup = async(data) => {
    try{
        const response = await axios.post(`${serverUrl}api/auth/signup`, data,
         {withCredentials: true})
         console.log(response)
         return response.data
    } catch (err) {
        console.log(err)
    }
} 
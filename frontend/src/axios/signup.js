import axios from "axios";

const serverUrl = "http://localhost:3000/"

// export const handleSignup = async() => {
    serverUrl = "http://localhost:3000/"
    try{
        const res = await axios.post(`${serverUrl}api/auth/signup`, {
            username, email, role, password, mobile, 
        }, {withCredentials: true})
    } catch (err) {
        console.log(err)
    }
// } 
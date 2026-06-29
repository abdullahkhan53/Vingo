import axios from "axios";
const serverUrl = "http://localhost:3000/"

export const handleSignin = async(data) => {
    try{
        const res = await axios.post(`${serverUrl}api/auth/signin`, data,
            {withCredentials: true}
        )
        console.log(res);
    } catch (err) {
        throw err;
    }
}
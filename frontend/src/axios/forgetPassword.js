import axios from "axios";
const serverUrl = "http://localhost:3000"

export const handleSendEmail = async(data) => {
    
    try {
        const response = await axios.post(`${serverUrl}/api/auth/send-mail`, data,
         {withCredentials: true}
    )
        console.log("Axios Response ", response)
        return response.data
    } catch (error) {
        return console.log("ERROR IN AXIOS FORGOTPASSWORD", error)
    }

}

export const handleVerifyOtp = async(data) => {
    
    try {
        const response = await axios.post(`${serverUrl}/api/auth/verify-otp`, data,
         {withCredentials: true}
    )
        console.log("Axios Response ", response)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export const handleSetNewPassword = async(data) => {
    
    try {
        const response = await axios.post(`${serverUrl}/api/auth/set-newPassword`, data,
         {withCredentials: true}
    )
        console.log("Axios Response ", response)
        return response.data
    } catch (error) {
        console.log(error)
    }

}
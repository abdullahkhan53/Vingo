import axios from "axios";

const serverUrl = "http://localhost:3000/"


export const handlePlaceOrder = async(formData) => {
    
    try {
        const result = await axios.post(`${serverUrl}api/order/place-order`, formData,
        {withCredentials: true}
        )
        console.log(result.data);

    } catch (error) {
        console.log("Status : 401  ---  Error in Place Order", error)
        throw error;
    }
}
import axios from "axios";
import { setAddLastOrder, setUpdateOrderStatus } from "../redux/userSlice.js";

const serverUrl = "http://localhost:3000/"


export const handlePlaceOrder = async(formData, dispatch) => {
    
    try {
        const result = await axios.post(`${serverUrl}api/order/place-order`, formData,
        {withCredentials: true}
        )
        console.log(result.data);
        dispatch(setAddLastOrder(result.data.newOrder))
    } catch (error) {
        console.log("Status : 401  ---  Error in Place Order", error)
        throw error;
    }
}

export const handleGetMyOrders = async() => {
    try{
        const result = await axios.get(`${serverUrl}api/order/my-orders`,
            {withCredentials: true}
        );
        return 
    } catch(error) {
        throw error;
    }
}

export const handleUpdateOrderStatus = async(orderId, shopId, status, dispatch) => {
    try {
        const result = await axios.post(`${serverUrl}api/order/update-status/${orderId}/${shopId}`,
            {status},
            {withCredentials: true}
        );
        dispatch(setUpdateOrderStatus({orderId, shopId, status}))
        console.log(result)
    } catch (error) {
        throw error;
    }
}
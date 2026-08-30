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

export const handleUpdateOrderStatus = async(orderId, shopId, status, dispatch, setAvailableDeliveryBoys) => {
    try {
        const result = await axios.post(`${serverUrl}api/order/update-status/${orderId}/${shopId}`,
            {status},
            {withCredentials: true}
        );
        dispatch(setUpdateOrderStatus({orderId, shopId, status}))
        setAvailableDeliveryBoys(result.data.availableDeliveryBoys)
        console.log(result.data)
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const handGetDeliveryBoyAssignments = async() => {
    try {
        const result = await axios.get(`${serverUrl}api/order/get-assignments`,
            {withCredentials: true}
        )
        return result.data;
    } catch (error) {
        throw error;
    }
}

export const handleDeliveryOrder = async(assignmentId) => {
    try {
        const result = await axios.post(`${serverUrl}api/order/accept-order/${assignmentId}`,
            {}, 
            {withCredentials: true}
        );
        return result.data;
    } catch (error) {
        throw error;
    }
}

export const handleGetCurrentOrder = async(setCurrentOrder) => {
    try {
        const result = await axios.get(`${serverUrl}api/order/get-current-order`,
            {withCredentials: true}
        )
        console.log(result.data)
        setCurrentOrder(result.data);
        return result.data;
    } catch(error) {
        throw error;
    }
}

export const handleGetOrderById = async(orderId) => {
    try {
        const result = await axios.get(`${serverUrl}api/order/get-order-by-id/${orderId}`,
            {withCredentials: true}
        )
        return result.data;
    } catch(error) {
        throw error;
    }
}

export const handleSendDeliveryOtp = async(orderId, shopOrderId) => {
    try {
        const result = await axios.post(`${serverUrl}api/order/send-delivery-otp`,
            {orderId, shopOrderId},
            {withCredentials: true}
        )
        
        return result.data;

    }  catch(error) {
        throw error;
    }
}

export const handleVerifyDeliveryOtp = async(orderId, shopOrderId, otp) => {
    try {
        const result = await axios.post(`${serverUrl}api/order/verify-delivery-otp`,
            {orderId, shopOrderId, otp},
            {withCredentials: true}
        ) 
        
        return result.data;

    } catch (error) {
        throw error;
    }
}
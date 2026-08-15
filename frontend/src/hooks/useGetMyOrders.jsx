import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMyOrders } from "../redux/userSlice.js";

const serverUrl = "http://localhost:3000"

function useGetMyOrders() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOrders = async() => {
                try{
            const result = await axios.get(`${serverUrl}/api/order/my-orders`, 
                {withCredentials: true}
            )
            dispatch(setMyOrders(result.data));
            console.log("Orders Data:", result.data);
        } catch(err){
            return console.log("error in Get My Orders custom hook : ", err)
        }
        }
        fetchOrders()
    }, [])
}

export default useGetMyOrders;
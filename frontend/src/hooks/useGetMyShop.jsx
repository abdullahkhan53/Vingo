import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice.js";

const serverUrl = "http://localhost:3000"

function useGetMyShop() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchShop = async() => {
                try{
            const result = await axios.get(`${serverUrl}/api/shop/get-my`, 
                {withCredentials: true}
            )
            dispatch(setMyShopData(result.data.shop));
            console.log("Owner Data:", result.data.shop);
        } catch(err){
            return console.log("error in shop custom hook : ", err)
        }
        }
        fetchShop()
    }, [])
}

export default useGetMyShop;
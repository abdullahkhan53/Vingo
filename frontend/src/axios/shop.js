import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice.js";

const serverUrl = "http://localhost:3000"


export const handleAddEditShop = async(formData, dispatch) => {
    try{
        const result = await axios.post(`${serverUrl}/api/shop/create-edit-shop`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            }
        )
        dispatch(setMyShopData(result.data.shop))
    } catch(err) {
        throw err;
    }
}

export const handleGetShopsByCity = async(city) => {
    try {
         const result = await axios.get(`${serverUrl}/api/shop/get-shops-by-city/${city}`,
            {
                withCredentials: true
            }
        )
        return result.data.shops;
    } catch (err) {
        throw err;
    }
}

export const handleGetShopById = async(shopId) => {
    try {
        const result = await axios.get(`${serverUrl}/api/shop/get-shop-by-id/${shopId}`,
            {withCredentials: true}
        )

        return result.data;

    } catch (err) {
        throw err;
    }
}
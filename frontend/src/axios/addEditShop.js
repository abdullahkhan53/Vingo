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
        dispatch(setMyShopData(result.data.shop || result.data.updatedShop))
    } catch(err) {
        throw err;
    }
}
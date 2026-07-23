import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice.js";

const serverUrl = "http://localhost:3000"


export const handleAddItem = async(formData, dispatch) => {
    try{
        const result = await axios.post(`${serverUrl}/api/item/add-item`,
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
export const handleDeleteItem = async(itemId) => {
    try{
        const result = await axios.post(`${serverUrl}/api/item/delete-item/${itemId}`,
            {}, { withCredentials: true}
        )
        // dispatch(setMyShopData(result.data.shop))
    } catch(err) {
        throw err;
    }
}

export const handleGetItemById = async(itemId) => {
    try {
        const result = await axios.get(`${serverUrl}/api/item/get-item-by-id/${itemId}`,
            { withCredentials: true }
        );
        return result.data.item;
    } catch(err) {
        throw err;
    }
}
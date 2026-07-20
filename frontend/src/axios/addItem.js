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
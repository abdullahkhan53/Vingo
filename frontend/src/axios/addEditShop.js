import axios from "axios";

const serverUrl = "http://localhost:3000"


export const handleAddEditShop = async(formData, dispatch) => {
    try{
        const result = await axios.post(`${serverUrl}/api/shop/create-edit-shop`,
            formData,
            {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true}
        )
        dispatch(setMyShopData(result.data.shop))
    } catch(err) {
        throw err;
    }
}
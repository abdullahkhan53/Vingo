import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShopsByCity } from "../redux/userSlice.js";

const serverUrl = "http://localhost:3000"

function useGetShopsByCity() {

    const {currCity} = useSelector((state) => state?.user)
    console.log("Current City in useGetShopsByCity:", currCity);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currCity || currCity === "null" || currCity.trim() === "") {
            console.log("City is currently null or empty, skipping fetch.");
            return;
        }
        const fetchShopsByCity = async() => {
                try{
            const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currCity}`, 
                {withCredentials: true}
            )
            dispatch(setShopsByCity(result.data.shops));
            console.log("Shops By City Data:", result.data.shops);
        } catch(err){
            return console.log("error in useGetShopsByCity custom hook : ", err)
        }
        }
        fetchShopsByCity()
    }, [currCity])
}

export default useGetShopsByCity;
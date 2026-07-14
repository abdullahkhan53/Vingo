import { useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import { setAddress, setCity, setState, setUserData } from "../redux/userSlice";

const serverUrl = "http://localhost:3000"

function useGetCity() {
    const userData = useSelector((state) => state.user?.userData);
    const dispatch = useDispatch()
    useEffect(() => {
        navigator.geolocation.getCurrentPosition( async(position) => {
            console.log(position)
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude)
            const response = await axios.get
            (`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFYKEY}`)
            console.log(response.data.results[0].city)
            dispatch(setCity(response.data.results[0].city))
            dispatch(setState(response.data.results[0].state))
            dispatch(setAddress(response.data.results[0].address_line2 ||  response.data.results[0].address_line1))
            // console.log(response.data)
        })
    }, [userData])
}

export default useGetCity;
import { useEffect } from "react";
import axios from "axios";

const serverUrl = "http://localhost:3000"

function useGetCity() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition( async(position) => {
            console.log(position)
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude)
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFYKEY}`)
            console.log(response.data.results[0].city)
        })
    }, [])
}

export default useGetCity;
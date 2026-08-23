import axios from "axios";
import react, { useEffect } from "react";
import { useSelector } from "react-redux";

const serverUrl = "http://localhost:3000"

function useGetCurrLocation() {
    const userData = useSelector((state) => state.user?.userData);

    useEffect( () => {
    const updateLocation = async({lng, lat}) => {
        const result = await axios.post(`${serverUrl}/api/user/update-location`,
             {lng, lat},
            {withCredentials: true}
        )
        // console.log("Location Updated", result.data)
    }
    navigator.geolocation.watchPosition( (pos) => {
        updateLocation({lng: pos.coords.longitude, lat: pos.coords.latitude})
    })
}, [userData])
};

export default useGetCurrLocation;[]
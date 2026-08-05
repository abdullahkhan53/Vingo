import React from "react";
import leaftlet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";  
import { useDispatch } from "react-redux";
import { setLocation, setLocationText } from "../redux/mapSlice.js";
import axios from "axios";

function ChangeView({lat, lng}) {
        if(lat && lng){
            let map = useMap();
            map.setView([lat, lng], 13, {animate: true})
        }
        return null;
    }

function Map() {
    const dispatch = useDispatch();
    const {lat, lng, text} = useSelector(state => state?.map?.location)

    const onDragEnd = (e) => {
        let {lat, lng} = e.target._latlng;
        dispatch(setLocation({lat, lng}))
        getCurrentAddress(lat, lng)
        
    }
    const getCurrentAddress = async(latitude, longitude) => {
        const response = await axios.get
            (`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFYKEY}`);
            dispatch(setLocationText(response.data.results[0].address_line2))
    }
    
    return (
        <>
        {lat && lng ? 
        <MapContainer
             center={[lat , lng ]} zoom={13} scrollWheelZoom={false} className="w-full h-full rounded-lg">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView lat={lat} lng={lng}/>
            
            <Marker position={[lat || "", lng || ""]} draggable eventHandlers={{dragend: onDragEnd}}>
            <Popup>
               {text || "Your Location"}
            </Popup>
            </Marker>

        </MapContainer> :
        ""
        }
        </>
    )
}

export default Map;
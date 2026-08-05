import React from "react";
import {useState, useEffect} from "react";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import Map from "../../components/Map";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocation, setLocationText } from "../../redux/mapSlice.js";

function Checkout() {
    const dispatch = useDispatch();
    const {lat, lng, text} = useSelector(state => state?.map?.location)
    const [inputAddress, setInputAddress] = useState(text || "")

    const getAddressByLatLng = () => {
            navigator.geolocation.getCurrentPosition( async(position) => {
                const {latitude, longitude} = position.coords;
                 const response = await axios.get
                (`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFYKEY}`)
                dispatch(setLocation({lat: latitude, lng: longitude}));
                dispatch(setLocationText(response.data.results[0].formatted))
            })
        }
    const getLatLngByAddress = async() => {
        try {
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(inputAddress)}&apiKey=${import.meta.env.VITE_GEOAPIFYKEY}`)
            // console.log(response.data.features[0].properties)
            const {lat, lon} = response.data.features[0].properties
            dispatch(setLocation({lat, lng: lon}));
            dispatch(setLocationText(response.data.features[0].properties.formatted))
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            <div className="h-screen flex justify-center items-center bg-[#fff9f6]">
                <div className="flex items-center  p-4 sm:p-6 gap-5 absolute top-3 left-3">
                    <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" 
                    onClick={() => navigate("/")}/>                 
                </div>
                <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg mt-5 mb-5 p-4 sm:p-6 space-y-5">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-5"><IoLocation color="#ff4d2d"/> Deliver to your location</h3>
                    <section className="w-full flex items-center gap-2">
                        <input type="text" placeholder="Enter your delivery address"
                        onChange={(e) => setInputAddress(e.target.value)}
                        value={inputAddress || ""}
                         className="border border-none rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] w-full"/>
                        < button className="bg-[#ff4d2d] text-white font-bold py-2 px-4 rounded-md hover:bg-[#ff4d2d]-900 transition-all duration-300 ease-in-out"
                        onClick={getLatLngByAddress}>   
                            <IoIosSearch /></button> 
                        < button className="hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md bg-blue-900 transition-all duration-300 ease-in-out"
                        onClick={getAddressByLatLng}>
                        <TbCurrentLocation /></button> 
                    </section>
                    <div className="h-65 w-full flex items-center justify-center">
                        <Map/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Checkout;
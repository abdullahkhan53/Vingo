import React from "react";
import {useState, useEffect} from "react";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import { MdDeliveryDining, MdPayment } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Map from "../../components/Map";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocation, setLocationText } from "../../redux/mapSlice.js";
import { handlePlaceOrder } from "../../axios/order.js";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {lat, lng, text} = useSelector(state => state?.map?.location)
    const {cartItems,totalPrice} = useSelector(state => state?.user)
    const [inputAddress, setInputAddress] = useState(text || "")
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const delivery = totalPrice > 500 ? 0 : 50;
    const amountWithDelivery = totalPrice + delivery;

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
    const onPlaceOrderClick = async() => {
        try {
            const formData = {
            paymentMethod,
            totalPrice,
            deliveryAddress:{
                text,
                longitude: lng,
                latitude: lat
            },
            cartItems
        }
        await handlePlaceOrder(formData);
        navigate("/order-placed")
        } catch (error) {
            console.log("Error in Checkout.jsx onPlaceOrderClick", error)
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

                    <section>
                        <h1 className="text-lg font-bold">Payment Method</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                            <div className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer transition ${paymentMethod === "cod" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-300"}`}
                             onClick={() => setPaymentMethod("cod")}>
                                <span className="h-10 w-10 rounded-full bg-green-100 inline-flex items-center justify-center"><MdDeliveryDining className="text-green-600" /></span>
                                <div className="flex flex-col gap-1">
                                    <span className="font-gray-900">Cash on Delivery</span>
                                    <span className="text-xs text-gray-400">Pay when your food arrives</span>
                                </div>

                            </div>
                            <div className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer transition ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-300"}`}
                            onClick={() => setPaymentMethod("online")}>
                                <span className="h-10 w-10 rounded-full bg-purple-100 inline-flex items-center justify-center"><FaMobileAlt  className="text-purple-600" /></span>
                                <span className="h-10 w-10 rounded-full bg-blue-100 inline-flex items-center justify-center"><MdPayment className="text-blue-600" /></span>
                                <div className="flex flex-col gap-1">
                                    <span className="font-gray-900">Credit / Debit Card</span>
                                    <span className="text-xs text-gray-400">Pay Securely Online</span>
                                </div>

                            </div>
                        </div>
                    </section>
                    
                    <section>
                        <h1 className="text-lg font-bold">Order Summary</h1>
                        <div className="border border-gray-300 rounded-lg mt-5">
                            {cartItems?.map((item, index) => (
                                
                            <div className=" p-3" key={index}>
                                <div className="flex justify-between" >
                                    <span className="text-gray-600 text-sm">{item.name} x {item.quantity}</span>
                                    <span className="text-gray-400 text-sm">Rs{item.price*item.quantity}</span>
                                </div>
                            </div>
                        ))}
                        <hr className="border-gray-200 "/>
                            <div className="flex justify-between p-3">
                                    <span className="text-gray font-bold text-sm">Sub Total</span>
                                    <span className="text-gray-400 text-sm font-bold">Rs{totalPrice}</span>
                             </div>
                        <hr className="border-gray-200 "/>
                            <div className="flex justify-between p-3">
                                    <span className="text-gray  text-sm">Delivery Fee</span>
                                    <span className="text-gray-400 text-sm ">{delivery == 0 ? "Free" : delivery}</span>
                             </div>
                        <hr className="border-gray-200  "/>
                            <div className="flex justify-between p-3">
                                    <span className="text-[#ff4d2d] font-bold">Total Amount </span>
                                    <span className="text-[#ff4d2d] font-bold ">Rs{amountWithDelivery}</span>
                            </div>
                            
                            {/* ----------------- */}
                        </div>
                        <button className="w-full bg-[#ff4d2d] text-white font-bold py-2 px-4 rounded-md hover:bg-[#ff4d2d]-300
                             transition-all duration-300 ease-in-out mt-2 cursor-pointer"
                             onClick={onPlaceOrderClick}>
                                {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
                            </button>
                    </section>
                </div>
            </div>
        </>
    )
};

export default Checkout;
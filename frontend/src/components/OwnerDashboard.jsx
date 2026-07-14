import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { ImSpoonKnife } from "react-icons/im";
import { useNavigate } from "react-router-dom";


function OwnerDashboard() {
    const {myShopData} = useSelector(state=>state.owner);
    const navigate = useNavigate()
    return(
        <div className="w-full min-h-screen flex flex-col items-center bg-[#fff9f6]">
            <Navbar/>
            { !myShopData && 
            <div className="flex items-center justify-center mt-[100px] p-4 sm:p-6">     
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg rounded-2xl p-6 border border-gray-200 
                    hover:shadow-2xl transition-shadow duration-300">

                    <div className="flex flex-col items-center text-center">
                            <ImSpoonKnife className=" text-[#ff4d2d] w-16 h-16 sm:w-20 sm-h-20 mb-4"/>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">Add Your Restaurant</h2>
                            <button className="bg-[#ff4d2d] text-white py-2 px-5 sm:px-6 rounded-full hover:bg-orange-600
                            transition-colors duration-200 cursor-pointer"
                            onClick={() => navigate("/create-shop")}>Get Started</button>
                    </div>

                </div>
            </div>
            }
        </div>

    )
}
 export default OwnerDashboard;
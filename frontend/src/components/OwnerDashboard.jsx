import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { ImSpoonKnife } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import ShopItem from "./item/ShopItem";

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
                            onClick={() => navigate("/create-edit-shop")}>Get Started</button>
                    </div>

                </div>
            </div>
            }

            {
                myShopData &&
                    <div className=" w-full flex flex-col items-center justify-center mt-[100px] p-4 sm:p-6 relative">
                   
                        <h1 className="flex flex-row gap-2 items-center justify-center text-xl sm:text-2xl font-bold text-gray-800 mb-8">
                            <ImSpoonKnife className=" text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 "/>
                            <span>Welcome to {myShopData?.name}</span> </h1>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-orange-200
                                hover:shadow-2xl transition-shadow duration-300 w-full max-w-3xl relative aspect-w-16 aspect-h-9">
                                    {/* Edit Icon */}
                                    <div className="absolute top-4 right-4 cursor-pointer">
                                        <FaPen size={20} className="text-[#ff4d2d]"
                                        onClick={() => navigate("/create-edit-shop")}/>
                                    </div>
                                    {/* Shop Image */}
                                <img src={myShopData?.image.url} alt={myShopData?.name} className="w-full h-48 sm:h-64 object-cover"/>
                                <div className="mb-5">
                                    <h2 className="text-lg sm:text-xl font-bold text-[#ff4d2d] mt-4 ml-4">{myShopData?.name}</h2>
                                    <p className="text-gray-600 mt-2 ml-4">{myShopData?.city} | {myShopData?.state}</p>
                                    <p className="text-gray-600  ml-4">{myShopData?.address} </p>
                                </div>
                        </div>

                    </div>
                
            }

            {
                myShopData?.items?.length == 0 && 

                <div className="flex items-center justify-center p-4 sm:p-6">     
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg rounded-2xl p-6 border border-gray-200 
                    hover:shadow-2xl transition-shadow duration-300">

                    <div className="flex flex-col items-center text-center">
                            <ImSpoonKnife className=" text-[#ff4d2d] w-16 h-16 sm:w-20 sm-h-20 mb-4"/>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">Add Food</h2>
                            <button className="bg-[#ff4d2d] text-white py-2 px-5 sm:px-6 rounded-full hover:bg-orange-600
                            transition-colors duration-200 cursor-pointer"
                            onClick={() => navigate("/add-item")}>Get Started</button>
                    </div>

                </div>
                </div>
            }

            {
                myShopData?.items?.length > 0 &&
                
                <div className="flex flex-col items-center w-full gap-3 mt-10 ">
                    {
                     myShopData.items.map((item, index) => <ShopItem data={item}  key={index} />)        
                    }
                </div>
            }

        </div>

    )
}
 export default OwnerDashboard;
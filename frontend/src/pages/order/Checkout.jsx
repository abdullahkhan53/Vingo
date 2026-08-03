import React from "react";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";


function Checkout() {
    return(
        <>
            <div className="h-screen flex justify-center items-center bg-[#fff9f6]">
                <div className="flex items-center  p-4 sm:p-6 gap-5 absolute top-3 left-3">
                    <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" 
                    onClick={() => navigate("/")}/>                 
                </div>
                <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg mt-5 mb-5 p-4 sm:p-6 ">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-5"><IoLocation color="#ff4d2d"/> Deliver to your location</h3>
                    <section className="w-full flex items-center gap-2">
                        <input type="text" placeholder="Enter your delivery address"
                         className="border border-none rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] w-full"/>
                        < button className="bg-[#ff4d2d] text-white font-bold py-2 px-4 rounded-md hover:bg-[#ff4d2d]-900 transition-all duration-300 ease-in-out">
                            <IoIosSearch /></button> 
                        < button className="hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md bg-blue-900 transition-all duration-300 ease-in-out">
                        <TbCurrentLocation /></button> 
                    </section>
                </div>
            </div>
        </>
    )
};

export default Checkout;
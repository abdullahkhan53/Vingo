import React, { useRef } from "react";
import Category from "./category/Category";
import { categories } from "../../utils/category.js";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

import Navbar from "./Navbar";

function UserDashboard() {

    const cateScrolllRef = useRef();

    const  handleCateScroll = (ref, direction) => {
        console.log(ref.current, direction);
    }

    return(
        <div className="w-screen min-h-screen flex flex-col items-center bg-[#fff9f6] overflow-y-auto">
        <Navbar/>

            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-[110px]">
                <h1 className="text-gray-800 text-4xl mb-4">Inspiration for your first order!</h1>

                {/* Section content goes here */}
                <div className="w-full relative">
                    <button className="absolute left-0 top-[50%] translate-y-[-50%] z-10 text-white bg-[#ff4d2d]
                     rounded-full p-1" onClick={handleCateScroll(cateScrolllRef, "left")}>
                        
                        <FaChevronCircleLeft size={30}  />
                    </button>
                    {/* Category Component */}
                    <div className="w-full flex items-center gap-4 overflow-x-auto  pb-2" ref={cateScrolllRef}>
                        {
                            categories.map((category, index) => {
                                return <Category data={category} key={index}/>;
                            })
                        }
                    </div>
                    <button className="absolute right-0 top-[50%] translate-y-[-50%] z-10 text-white bg-[#ff4d2d] rounded-full p-1">
                        <FaChevronCircleRight size={30} />
                    </button>
                </div>

            </div>

        </div>
    )
}

export default UserDashboard;
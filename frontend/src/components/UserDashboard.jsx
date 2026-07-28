import React, { useState, useEffect, useRef } from "react";
import Category from "./category/Category";
import { categories } from "../../utils/category.js";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import ShopsByCity from "./shop/ShopsByCity.jsx";
import ItemsByCity from "./item/ItemsByCity.jsx";

function UserDashboard() {

    const shops = useSelector(state => state.user.shopsByCity)
    const {currCity} = useSelector(state => state.user)

    const cateScrollRef = useRef();
    const [isRightScroll, setIsRightScroll] = useState(false);
    const [isLeftScroll, setIsLeftScroll] = useState(false);

    const  handleCateScroll = (ref, direction) => {
        try {
            if (ref.current) {
            ref.current.scrollBy({
                left: direction == "left" ? - 250 : 250,
                behavior: "smooth"
            })            
        }
        } catch(err) {
            console.log(err);
        }
    }

    const handleScrollBtn = () => {
        try{
            if(!cateScrollRef.current) return;

            let {scrollLeft, clientWidth, scrollWidth} = cateScrollRef.current;
            let result = scrollLeft + clientWidth >= scrollWidth - 1;

            if(result) {
                setIsRightScroll(true);
            }  else {
                setIsRightScroll(false)
            };

            if(scrollLeft <= 5) {
                setIsLeftScroll(true);
            } else {
                setIsLeftScroll(false)
            };

        } catch(err) {
            console.log(err);
        }
    }

    useEffect( () => {
        try{
            if(!cateScrollRef.current) return;
            const cateScrollContainer = cateScrollRef.current;
           
           handleScrollBtn();

            cateScrollContainer.addEventListener("scroll", handleScrollBtn);
           
           return () => {
            cateScrollContainer.removeEventListener("scroll", handleScrollBtn);
           }
        } catch(err) {
            console.log(err);
        }
    }, [])

    return(
        <div className="w-screen min-h-screen flex flex-col items-center bg-[#fff9f6] overflow-y-auto">
        <Navbar/>

            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-[110px]">
                <h1 className="text-gray-800 text-4xl mb-4">Inspiration for your first order!</h1>

                {/* Section content goes here */}
                <div className="w-full relative">

                    {
                        !isLeftScroll && 
                        <button className="absolute left-0 top-[50%] translate-y-[-50%] z-10 text-white bg-[#ff4d2d]
                        rounded-full p-1 cursor-pointer" onClick={() => handleCateScroll(cateScrollRef, "left")}>
                            
                            <FaChevronCircleLeft size={30}  />
                        </button>
                    }
                    {/* Category Component */}
                    <div className="w-full flex items-center gap-4 overflow-x-auto  pb-2" ref={cateScrollRef}>
                        {
                            categories.map((category, index) => {
                                return <Category data={category} key={index}/>;
                            })
                        }
                    </div>
                    {
                        !isRightScroll && 
                        <button className="absolute right-0 top-[50%] translate-y-[-50%] z-10 text-white bg-[#ff4d2d]
                        rounded-full p-1 cursor-pointer"  onClick={() => handleCateScroll(cateScrollRef, "right")}>
                            <FaChevronCircleRight size={30} />
                        </button>
                    }
                </div>

            </div>

            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-[110px]">
                <h1 className="text-gray-800 text-4xl mb-4">Find Delicious fOOd in {currCity}!</h1>
                
                {/* ShopsByCity Component */}
                    <div className="w-full flex items-center gap-4 overflow-x-auto  pb-2" ref={cateScrollRef}>
                        {
                            shops?.length > 0 ? 
                            shops.map((shop, index) => {
                                return <ShopsByCity data={shop} key={index}/>;
                            }) : ""
                        }
                        </div>

            </div>

            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-[110px]">
                <h1 className="text-gray-800 text-4xl mb-4">Suggested fOOd Items here ..</h1>
                
                {/* Items in current city Component */}
                    <div className="w-full flex items-center gap-4 overflow-x-auto  pb-2" ref={cateScrollRef}>
                        {
                            shops?.length > 0 ? 
                            shops.map((shop, shopIndex) => {
                                return(
                                shop.items?.map((item, itemIndex) => {
                                    return <ItemsByCity data={item} key={itemIndex}/>;
                                }))
                            }) : ""
                        }
                        </div>

            </div>

        </div>
    )
}

export default UserDashboard;
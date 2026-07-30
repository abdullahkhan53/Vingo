import React from "react";
import { IoIosLeaf } from "react-icons/io";
import { GiChickenLeg } from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function ItemsByCity({ data }) {

    let stars =[];
    const renderStars = (rating) => {
        for(let i = 1; i <=5; i++) {
            stars.push(
                (i <= rating) ?
                (<FaStar size={20} className="text-yellow-400 tex-lg"/>) :
                (<CiStar size={20} className="text-yellow-400 text-lg"/>)
            )
        };
        return stars
    }

    return(
        <div className="w-[120px] md:w-[180px] md:h-[180px] bg-white shadow-xl
         border-2 border-[#ff4d2d] shadow-gray rounded-2xl  shrink-0 overflow-hidden
          gap-[10px] hover:shadow-lg transition-shadow relative hover:translate-y-[-8px] duration-s relative">

            <div className="absolute top-3 right-3 p-1 bg-white rounded-full">
                {data.foodType === "veg" ? 
                <IoIosLeaf size={18} className="text-green-500 text-lg"/> :
                <GiChickenLeg size={18} className="text-brown-500 text-lg"/> }
            </div>

            <div className="w-full  flex flex-col gap-[10px] cursor-pointer">
                <div className="w-[100%] h-[100%]  overflow-hidden hover:scale-[1.2] transition-transform duration-300">
                    <img src={data.image.url} alt={data.name} className="w-[100%] h-full object-cover"/>
                </div>

                <div className="w-[100%] h-[15%] flex items-center justify-center absolute bottom-0 left-0
                bg-white/60 backdrop-blur-md">
                    <h1 className="text-gray-800 text-sm md:text-lg font-semibold">{data.name}</h1>
                </div>

                {/* Rating  and Cart */}
                <div className="flex justify-between p-4 border-red-300 w-full">
                    <div className="flex justifuy-center text-center">
                        {
                            renderStars(data.rating.average)
                        }
                    </div>
                    <div>
                        cart
                    </div>
                </div>

            </div>
                    
                    

        </div>
    )
}

export default ItemsByCity;
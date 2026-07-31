import React from "react";
import { useState } from "react";
import { IoIosLeaf } from "react-icons/io";
import { GiChickenLeg } from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import { useDispatch,useSelector } from "react-redux";
import { setAddToCart } from "../../redux/userSlice";

function ItemsByCity({ data }) {

    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.user);
    const [quantity, setQuantity] = useState(0);

    const renderStars = (rating) => {
        let stars =[];
        for(let i = 1; i <=5; i++) {
            stars.push(
                (i <= rating) ?
                (<FaStar size={20} className="text-yellow-400 tex-lg"/>) :
                (<CiStar size={20} className="text-yellow-400 text-lg"/>)
            )
        };
        return stars;
    }
    const handleQtyIncrease = () => {
        setQuantity((prev) => {
            return prev + 1
        })
    }
    const handleQtyDecrease = () => {
        setQuantity((prev) => {
            if(prev > 0) {
                return prev - 1
            }  
            return prev;
        })
    }

    return(
        <div className=" sm:w-[100%]  md:w-[275px] h-auto bg-white shadow-xl flex flex-col
         border-2 border-[#ff4d2d] shadow-gray rounded-2xl  shrink-0 overflow-hidden
          gap-[10px] hover:shadow-lg transition-shadow relative hover:translate-y-[-8px] duration-s relative">

            <div className="absolute top-3 right-3 p-1 bg-white rounded-full">
                {data.foodType === "veg" ? 
                <IoIosLeaf size={18} className="text-green-500 text-lg"/> :
                <GiChickenLeg size={18} className="text-brown-500 text-lg"/> }
            </div>

            <div className="w-full h-[140px] md:h-[160px]  flex flex-col gap-[10px] cursor-pointer relative">
                <div className="w-[100%] h-[100%]  overflow-hidden hover:scale-[1.2] transition-transform duration-300">
                    <img src={data.image.url} alt={data.name} className="w-[100%] h-full object-cover"/>
                </div>

                <div className="w-[100%] h-[15%] flex items-center justify-center absolute bottom-0 left-0
                bg-white/60 backdrop-blur-md">
                    <h1 className="text-gray-800 text-sm md:text-lg font-semibold">{data.name}</h1>
                </div>

                {/* <p className="text-gray-800 text-sm md:text-lg font-semibold">{data.price}</p>               */}

            </div>
                    {/* Rating  and Cart */}
                <div className="flex justify-between items-center p-4 border-red-300 w-full gap-5 relative">
                    <div className="flex justifuy-center text-center relative pr-4 pt-2">
                        {
                            renderStars(data?.rating?.average)
                        }
                        <span className="absolute right-0 top-0">{data?.rating?.count}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-gray-800 text-lg font-semibold m-2">
                        <div className="flex items-center justify-center gap-2 text-gray-800 text-lg font-semibold
                        border-2 border-[#ff4d2d] rounded-full px-3 py-1 cursor-pointer">
                            <span onClick={handleQtyDecrease}><TiMinus /></span>
                            <span className="text-[#ff4d2d]">{quantity}</span>
                            <span onClick={handleQtyIncrease}><FaPlus /></span>
                        </div>
                            <div className={`absolute right-1 top-[2] translate-y-[-50%] 
                                ${quantity > 0 ? "text-[#ff4d2d] cursor-pointer" : "text-gray-900 cursor-not-allowed"}`}>
                                <IoCart onClick={ () => {
                                    quantity > 0 ?
                                    dispatch(setAddToCart({
                                        id: data._id,
                                        name: data.name,
                                        price: data.price,
                                        quantity,
                                        image: data.image.url,
                                        shop: data.shop,
                                        foodType: data.foodType
                                    })) : null
                                } }/>
                            </div>
                    </div>
                </div>
                    

        </div>
    )
}

export default ItemsByCity;
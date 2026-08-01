import React from 'react'
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";


function CartItems({ data }) {
    return (
        <div className='w-full  bg-white shadow-lg rounded-lg flex items-center justify-between p-4 gap-2'>
            <div  className='flex items-center gap-4'>
                <img src={data?.image} alt={data.name} width="100" height="100" className="rounded-lg" />
                <div className='flex flex-col gap-2'>
                    <span>
                        <h3 className="text-gray-600 ">{data.name}</h3>
                        <p className="text-gray-600 ">Rs {data.price} x {data.quantity}</p>
                    </span>
                    <p className="text-lg font-bold">Rs {data.price * data.quantity}</p>
                </div>
            </div>

            <div>
                 <div className="flex items-center justify-center gap-3  text-lg font-semibold">   
                    <span className="p-1 bg-gray-300 text-white rounded-full cursor-pointer">
                        <TiMinus size={16}/></span>
                    <span className="text-[#ff4d2d]">{data.quantity}</span>
                    <span className="p-1 bg-gray-300 text-white rounded-full cursor-pointer">
                        <FaPlus size={16}/></span>
                        <span className="text-[#ff4d2d] cursor-pointer space-left-2" >
                            <GoTrash size={22}/></span>
                </div>
            </div>

        </div>
    )
}

export default CartItems;
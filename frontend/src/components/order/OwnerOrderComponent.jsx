import React from "react";
import { MdCall } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { handleUpdateOrderStatus } from "../../axios/order.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

function OwnerOrderComponent({data}) {
    const dispatch = useDispatch()
    const [availableDeliveryBoys, setAvailableDeliveryBoys] = useState([])
    console.log(availableDeliveryBoys)
     const onUpdateOrderStatusClick = async(orderId, shopId, status) => {
            try {
                const result = await handleUpdateOrderStatus(orderId, shopId, status, dispatch, setAvailableDeliveryBoys)

            } catch (error) {
                console.log(error)
            }
        }

    return(
        <div className="bg-white w-full shadow-xl rounded-lg mx-2 p-4">
            <div>
                <p className="text-xl font-semibold text-gray-900">{data.user.username}</p>
                <p className="text-sm  text-gray-500">{data.user.email}</p>
                <p className=" flex items-center gap-2 text-sm  text-gray-700"><MdCall /><span>{data.user.mobile}</span></p>
            </div>
            <div className="flex flex-col gap-1 mt-2">
                <p className=" flex items-center gap-2  text-sm  text-gray-700"><FaHome /><span>{data.deliveryAddress.text}</span></p>
                <span className=" text-xs  text-gray-500">Lat: {data.deliveryAddress.latitude}, Lng: {data.deliveryAddress.longitude}</span>
            </div>
             <div className="flex gap-2 overflow-x-auto my-4">
                {
                data.shopOrders[0]?.shopOrderItems.map((item, index) => 
                    <div className="flex-shrink-0 gap-2 w-40 border border-gray-300 bg-white  p-2 rounded-lg" key={index}>
                        <img src={item.item?.image?.url} alt={item.item?.name} className="w-full h-25 object-cover rounded-lg mb-1" />
                        <p className="text-sm font-medium text-gray-600">{item.item.name} </p> 
                        <span className="text-sm font-bold text-green-600">Qty {item.quantity} x Rs {item.item.price}</span>
                    </div>
                )
            }
            </div>

            <div className="flex items-center justify-between">
                <span>Status: <span className="text-[#ff4d2d]">{data.shopOrders[0]?.status}</span></span>
                <select className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-500"
                 onChange={(e) => onUpdateOrderStatusClick(data._id, data.shopOrders[0].shop, e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>    
                    <option value="out of delivery">Out Of Delivery</option>
                </select>
            </div>

            {
                availableDeliveryBoys?.length > 0 && 
                <div className="mt-4 bg-gray-100 p-2 rounded-lg">
                    <p className="font-semibold text-gray-700 mb-2">Available Delivery Boys</p>
                    <div>
                        {
                            availableDeliveryBoys?.map((boy) => (
                               <>
                                    <p className="text-sm text-gray-600"><span className="font-semibold">Name:</span> {boy.name}</p> 
                                    <p className="text-sm text-gray-600"><span className="font-semibold">Mobile:</span> {boy.mobile}</p> 
                                    <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {boy.email}</p>
                               </> 
                            ))
                        }
                    </div>
                </div>
            }

            <div className="text-right font-bold text-sm mt-6">
                <p>Total Amount: Rs{data.shopOrders[0].subTotal}</p>
            </div>
        </div>
    )
};

export default OwnerOrderComponent;
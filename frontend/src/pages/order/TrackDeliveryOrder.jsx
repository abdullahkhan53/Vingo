import react from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleGetOrderById } from "../../axios/order.js";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from "../../components/order/DeliveryBoyTracking.jsx";

function TrackDeliveryOrder() {
    const {orderId} = useParams();
    const navigate = useNavigate();
    const [currentOrder, setCurrentOrder] = useState(null)
    useEffect( () => {
        const data = async() => {
            const result = await handleGetOrderById(orderId);
            console.log(result)
             setCurrentOrder(result);
        }
        data()
    }, [orderId])

    return(
        <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col  gradient-to-b from-[#fff9f6] to-[#fff9f6] p-2">     
        
             <div className="flex items-center p-4 sm:p-6 gap-3 relative top-5 left-5">
                <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" 
                onClick={() => navigate("/")}/>  
                <h2 className=" font-bold text-[#ff4d2d]">Track Order</h2>              
            </div>  

            <div className="flex flex-col items-center justify-center w-full max-w-[800px] gap-4 bg-white rounded-lg m-auto p-4">
                {
                currentOrder ?
                    currentOrder?.shopOrders.map( (shopOrder, index) => (
                        <div className="w-full " key={index}>
                            <h3 className="text-[#ff4d2d]"><span className="font-semibold">Shop Name:</span> {shopOrder.shop.name}</h3>

                            <p className="text-gray-600"
                            ><span className="font-semibold">Items: </span>
                            {
                                shopOrder.shopOrderItems?.map( (item, key) => item.name).join(", ")
                            }
                            </p>

                            <p className="text-gray-600"><span className="font-semibold">Sub Total: </span>Rs {shopOrder.subTotal}</p>
                            <p className="text-gray-600"><span className="font-semibold">Delivery: </span> {currentOrder.deliveryAddress?.text}</p>

                            {/* DELIVERY BOY NAME */}
                            {
                                shopOrder.assignedDeliveryBoy ?
                                <div className="mt-2">
                                    <p className="text-[#ff4d2d]"><span className="font-semibold">Delivery Boy Name: </span> {shopOrder.assignedDeliveryBoy.username}</p>
                                    <p className="text-gray-600"><span className="font-semibold">Delivery Boy Contact: </span> {shopOrder.assignedDeliveryBoy.mobile}</p>
                                </div>
                                :
                                <p>No Delivery Boy Assigned for this order!</p>
                            }

                            {/* DELIVERY BOY TRACKING */}
                            <DeliveryBoyTracking
                            data={
                                {
                                   deliveryBoyLocation:{
                                    lat: shopOrder.assignedDeliveryBoy?.location?.coordinates[1],
                                    lon: shopOrder.assignedDeliveryBoy?.location?.coordinates[0],
                                   },
                                   customerLocation:{
                                    lat: currentOrder.deliveryAddress?.latitude,
                                    lon: currentOrder.deliveryAddress?.longitude,
                                   }
                                }
                            }
                            />

                        </div>
                    ))
                    
                    :
                    <p className="text-gray-600">Order Delivered</p>
                }


            </div>     
                    
        </div>
    )
}

export default TrackDeliveryOrder;
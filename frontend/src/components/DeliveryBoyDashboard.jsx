import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { handGetDeliveryBoyAssignments, handleDeliveryOrder, handleGetCurrentOrder } from "../axios/order";
import { useState } from "react";

function DeliveryBoyDashboard() {
    const { userData } = useSelector(state => state.user);
    const [deliveryAssignments, setDeliveryAssignments] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);

    const onDeliveryOrderClick = async(assignmentId) => {
        try {
            const result = await handleDeliveryOrder(assignmentId);
            setCurrentOrder(null);
            await handleGetCurrentOrder(setCurrentOrder);

            console.log(result)
        } catch(err) {
            console.log(err)
        }

    }

    useEffect( () => {
        handleGetCurrentOrder(setCurrentOrder);
        const logData = async() => {
            const data = await handGetDeliveryBoyAssignments();
            console.log("state data: ",data);
            setDeliveryAssignments(data);
        } 
        logData()
    }, [userData])

    return(
        <div className="w-full min-h-screen flex flex-col items-center bg-[#fff9f6]">
             <Navbar/>
             <div className="w-full max-w-[800px] flex flex-col items-center gap-4 mt-[100px]">
                <div className="w-[90%] bg-white shadow-xl rounded-lg p-4">
                        {
                            userData? 
                            <>
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <h1 className="text-xl font-bold text-[#ff4d2d]">Welcome, {userData.username}</h1>
                                    <span>
                                        <p className="text-sm  text-[#ff4d2d]"><span className="font-semibold">Latitude</span>: {userData.location.coordinates[1]}</p>
                                        <p className="text-sm  text-[#ff4d2d]"><span className="font-semibold">Longitude</span>: {userData.location.coordinates[0]}</p>
                                    </span>
                                </div>
                            </> : 
                            ""
                        }
                </div>

                {
                    !currentOrder && 
                    <div className="w-[90%] bg-white shadow-xl rounded-lg p-4">
                    <h1 className="text-xl font-bold mb-4">Available Orders</h1>
                    {/* <div> */}
                        {
                            deliveryAssignments.length > 0 ?
                                (
                                    deliveryAssignments.map( (o, index) => 
                                        (
                                        <div className=" flex items-centerborder border-gray-300 p-2 rounded-lg" key={index} >
                                            <div>
                                                <p className="text-gray-900 font-semibold text-sm">{o.shopName}</p>
                                                <p className="text-gray-500 text-xs">Delivery Address: {o.deliveryAddress.text}</p>
                                                <p className="text-gray-500 text-xs">{o.items.length} items  |  {o.subTotal}</p>
                                            </div>
                                            <button className="bg-[#ff4d2d] text-white px-8  rounded-md ml-auto hover:bg-[#e03e1f] transition-colors duration-300 cursor-pointer"
                                            onClick={ () => onDeliveryOrderClick(o.assignmentId) }>
                                                Accept
                                            </button>

                                        </div>
                                        )
                                    )
                                )
                            :
                            <p>No Orders Available</p>
                        }
                    {/* </div> */}
                </div>
                }

                {
                    currentOrder &&
                    <div className="w-[90%] bg-white shadow-xl rounded-lg p-4">
                        <h1 className="text-xl font-bold mb-4">Current Order</h1>
                        <div className="border border-gray-200 p-2 rounded-lg shadow-md">
                            <p className="font-semibold text-sm text-orange-400"> {currentOrder.shopName}</p>

                        </div>
                    </div>
                }

             </div>
        </div>
    )
}

export default DeliveryBoyDashboard;
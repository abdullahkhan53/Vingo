import react from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import UserOrderComponent from "../../components/order/UserOrderComponent";
import OwnerOrderComponent from "../../components/order/OwnerOrderComponent";
import { setMyOrders, setUpdateOrderStatus } from "../../redux/userSlice";
import { useEffect } from "react";
import { handleGetMyOrders } from "../../axios/order.js";

function MyOrders() {
    const {userData, myOrders, socket} = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();



    useEffect(() => {
        if (!userData || !socket) return;

        const handleNewOrder = (data) => {
            console.log("New Order Received in MyOrders.jsx", data);
            if (userData.role === "owner" && data?.shopOrders[0]?.owner?._id === userData._id) {
                dispatch(setMyOrders([data, ...myOrders]));
            }
        };

        const handleOrderStatusUpdated = async (data) => {
            dispatch(setUpdateOrderStatus(data));
            const order = await handleGetMyOrders()
             dispatch(setMyOrders(order));
        };

        socket.on("newOrder", handleNewOrder);
        socket.on("orderStatusUpdated", handleOrderStatusUpdated);

        return () => {
            socket.off("newOrder", handleNewOrder);
            socket.off("orderStatusUpdated", handleOrderStatusUpdated);
        };
    }, [socket, userData, myOrders, dispatch]);


    return(
        <div className="w-full min-h-screen flex justify-center bg-[#fff9f6] ">
            <div className="flex items-center  p-4 sm:p-6 gap-5 absolute top-2 left-2">
                    <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" 
                    onClick={() => navigate("/")}/>                 
            </div>
            <div className="w-full max-w-[800px] flex flex-col items-center justify-center gap-[20px] rounded-2xl my-4">
                {
                    myOrders?.length > 0 &&
                    myOrders?.map((order, index) => 
                        userData?.role == "user" ?
                        (
                            <UserOrderComponent data={order} key={index}/>
                        )
                        :
                        userData?.role=="owner" ? 
                        (
                            <OwnerOrderComponent data={order} key={index}/>
                        )
                        : null
                    )
                }
            </div>
        </div>
    )
};

export default MyOrders;
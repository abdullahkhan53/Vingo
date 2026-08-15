import react from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import UserOrderComponent from "../../components/order/UserOrderComponent";
import OwnerOrderComponent from "../../components/order/OwnerOrderComponent";

function MyOrders() {
    const {userData, myOrders} = useSelector((state) => state.user);
    const navigate = useNavigate();
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
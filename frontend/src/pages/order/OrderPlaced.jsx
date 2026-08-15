import react from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
    const navigate = useNavigate();
    return(
        <div className="w-[100%] h-[100vh] flex items-center justify-center bg-[#fff9f6]">
            <div className="w-[100%] md:w-[400px] h-[300px] bg-white shadow-xl flex flex-col items-center justify-center gap-[20px] rounded-2xl">
                <div className="bg-green-500 w-15 h-15 rounded-full flex items-center justify-center ">
                    <TiTick className="text-white" size={30} />
                </div>
                <h1 className="text-gray-800 text-2xl font-bold">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600 text-center px-4 text-sm">
                    Thank you for your order. Your order has been placed successfully and is being processed. You will receive a confirmation email shortly with the details of your order.
                </p>
                <div className=" w-full flex items-center justify-end px-4">
                    <buttton className="bg-[#ff4d2d] text-white py-2 px-4 rounded-md hover:bg-[#ff4d2d] hover:text-white cursor-pointer transition-all duration-300 ease-in-out mt-2 "
                    onClick={() => navigate("/my-orders")}>
                    Back to my orders
                    </buttton>
                </div>
            </div>
        </div>
    )
}

export default OrderPlaced;
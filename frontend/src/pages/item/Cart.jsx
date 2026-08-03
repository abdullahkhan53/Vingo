import react from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItems from "../../components/item/CartItems";

function Cart() {
    const navigate = useNavigate();
    const {cartItems, totalPrice} = useSelector(state => state.user);
    return(
        <div className="w-screen h-screen flex  justify-center">
            <div className="w-full max-w-[800px] bg-[#fff9f6] rounded-lg shadow-lg mt-5 mb-5 p-4 sm:p-6 ">
                
                <div className="w-full flex items-center ">
                    <div className="flex items-center  p-4 sm:p-6 gap-5 ">
                        <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" 
                        onClick={() => navigate("/")}/>                 
                    </div>
                    <h1 className="text-2xl font-bold text-[#ff4d2d]">Cart Page</h1>
                </div>

                {
                    cartItems?.length === 0 ? 
                    <p className="pl-5 ">Your Cart is Empty</p>
                    :
                    <>
                    <div className="w-full p-4 sm:p-6 space-y-5">
                        {cartItems.map((cart, index) => (
                            <CartItems  data={cart} key={index} />
                        ))}
                    </div>
                    <div className="w-full p-4 sm:p-6 flex items-center justify-between bg-white shadow-lg rounded-b-lg">
                        <h1 className="text-lg font-bold text-gray-800">Total Price</h1>
                        <h3 className="text-lg font-bold text-[#ff4d2d]">Rs {totalPrice}</h3>
                    </div>

                    <div className="w-full p-4 sm:p-6  flex items-center justify-end">
                    <button className=" text-white font-bold rounded-b-lg mt-2 cursor-pointer bg-[#ff4d2d] p-2 sm:p-3 hover:bg-[#ff4d2d]-900 hover:shadow-lg transition-all duration-300 ease-in-out"
                        onClick={() => navigate("/checkout")}
                    >Proceed to Order Your Food</button>
                    </div>
                    </>
                }

            </div>
        </div>
    )
}

export default Cart;
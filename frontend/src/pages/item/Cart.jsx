import react from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItems from "../../components/item/CartItems";

function Cart() {
    const navigate = useNavigate();
    const {cartItems} = useSelector(state => state.user);
    return(
        <div className="w-screen h-screen flex  justify-center">
            <div className="w-full max-w-[800px] bg-[#fff9f6] rounded-lg shadow-lg mt-5 mb-5">
                
                <div className="w-full flex items-center ">
                    <div className="flex items-center  p-4 sm:p-6 gap-5 ">
                        <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" 
                        onClick={() => navigate("/")}/>                 
                    </div>
                    <h1 className="text-2xl font-bold text-[#ff4d2d]">Cart Page</h1>
                </div>

                {
                    cartItems?.length === 0 ? 
                    <p>Your Cart is Empty</p>
                    :
                    <div className="w-full p-4 sm:p-6">
                        {cartItems.map((cart, index) => (
                            <CartItems  data={cart} key={index} />
                        ))}
                    </div>
                }

            </div>
        </div>
    )
}

export default Cart;
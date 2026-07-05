import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

function Navbar() {
    return(
        <>
            <div className="w-full h-[80px] flex items-center jsutify-between md:justify-center gap-[30px]
                px-[20px] fixed top-5 z-[9999] bg-[#fff9f6] overflow-visible ">

                    <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
                    <div className="md:w-[60%] lg-w[40%] h-[70px] bg-white shadow-xl rounded-lg flex items-center gap-[20px]">

                        {/* CITY SECTION */}
                        <div className="w-[30%] h-full flex items-center justify-center overflow-hidden gap-[10px] px-[10px] border-r[2px] border-gray-400 ">
                            <FaLocationDot size={25} className="text-[#ff4d2d]"/>
                            <div className="w-[80%] truncate text-gray-600 flex justify-between">Karachi <span>|</span></div>
                        </div>

                        {/* SEARCH SECTION */}
                        <div className="w-[80%]  flex items-center justify-center gap-[10px] ">
                            <CiSearch size={25} className="text-[#ff4d2d]"/>
                            <input type="text" placeholder="Search Delecious Food..." className="outline-none border-none bg-transparent placeholder:text-gray-500" />
                        </div>

                    </div>
                        {/* CART */}
                    <div className="cursor-pointer relative">
                        <FaShoppingCart size={25} className="text-[#ff4d2d]"/>
                        <span className="absolute right-[-9px] top-[-12px] text-[#ff4d3d]">0</span>
                    </div>

                        {/* MY ORDER */}
                        <button className="hidden md:block cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]
                        text-sm font-medium">My Order</button>

                        {/* PROFILE */}
                        <div className="cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-[#ff4d2d] flex items-center justify-center text-white font-bold">U</div>
                        </div>

            </div>
        </>
    )
}

export default Navbar;
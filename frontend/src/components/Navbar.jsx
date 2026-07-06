import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {useState} from "react";

function Navbar() {
    const userData = useSelector(state => state.user?.userData); 
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    return(
        <>
            <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px]
                px-[20px] fixed top-5 z-[9999] bg-[#fff9f6] overflow-visible ">

                    <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
                    <div className="md:w-[60%] lg-w[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-[20px]">

                        {/* CITY SECTION */}
                        <div className="w-[30%] h-full flex items-center justify-center overflow-hidden gap-[10px] px-[10px] border-r[2px] border-gray-400 ">
                            <FaLocationDot size={25} className="text-[#ff4d2d]"/>
                            <div className="w-[80%]  text-gray-600 flex justify-between">Karachi <span>|</span></div>
                        </div>

                        {/* SEARCH SECTION */}
                        <div className="w-[80%]  flex items-center justify-center gap-[10px] ">
                            <CiSearch size={25} className="text-[#ff4d2d]"/>
                            <input type="text" placeholder="Search Delecious Food..." className="outline-none border-none bg-transparent placeholder:text-gray-500" />
                        </div>

                    </div>

                    {
                        showSearch &&
            
                        <div className="fixed top-[80px] left-0 w-full h-[70px] bg-white shadow-lg flex items-center justify-center gap-[20px] px-[20px] z-[9999]">
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
                    }

                    <div className="flex items-center gap-[20px] ">
                        {showSearch? <RxCross2 size={25} className="text-[#ff4d2d] cursor-pointer" onClick={()=>setShowSearch(false)}/> :
                        <CiSearch size={25} className="text-[#ff4d2d] truncate md:hidden" onClick={() => setShowSearch(true)}/>
                        }
                        {/* CART */}
                        <div className="cursor-pointer relative">
                            <FaShoppingCart size={25} className="text-[#ff4d2d]"/>
                            <span className="absolute right-[-9px] top-[-12px] text-[#ff4d3d]">0</span>
                        </div>

                        {/* MY ORDER */}
                        <button className="hidden md:block cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]
                        text-sm font-medium">My Order</button>

                        {/* PROFILE */}
                        <div className="cursor-pointer" onClick={() => setShowInfo((prev)=>!prev)}>
                            <div className="w-10 h-10 rounded-full bg-[#ff4d2d] flex items-center justify-center text-white font-bold">
                                {userData?.username ? userData.username.slice(0, 1).toUpperCase() : "U"}
                            </div>
                        </div>

                        {/* ON PROFILE CLICK */}
                        {
                            showInfo && 
                            <div className=" fixed top-[80px] right-5 w-[200px] bg-white shadow-lg rounded-lg p-4 items-center flex flex-col gap-[10px] z-[9999]">
                            <p className="">{userData?.username || "User"}</p>
                            <div className="">My Order</div>
                            <div className="text-[#ff4d2d]">Log Out</div>
                            </div>
                        }                

                    </div>

            </div>
        </>
    )
}

export default Navbar;
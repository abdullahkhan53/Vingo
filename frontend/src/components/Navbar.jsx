import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {useState} from "react";
import { handleLogout } from "../axios/logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()
    const {userData, city} = useSelector(state => state.user);
    const {myShopData} = useSelector(state => state.owner);
    const dispatch = useDispatch();
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const onLogoutClick = async() => {
        try{
            await handleLogout(dispatch)
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <>
            <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px]
                px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible ">

                    <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
                    {
                        userData.role == "user" &&
                        <div className="md:w-[60%] lg-w[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-[20px]">

                        {/* CITY SECTION */}
                        <div className="w-[30%] h-full flex items-center justify-center overflow-hidden gap-[10px] px-[10px] border-r[2px] border-gray-400 ">
                            <FaLocationDot size={25} className="text-[#ff4d2d]"/>
                            <div className="w-[80%]  text-gray-600 flex justify-between">{city} <span>|</span></div>
                        </div>

                        {/* SEARCH SECTION */}
                        <div className="w-[80%]  flex items-center justify-center gap-[10px] ">
                            <CiSearch size={25} className="text-[#ff4d2d]"/>
                            <input type="text" placeholder="Search Delecious Food..." className="outline-none border-none bg-transparent placeholder:text-gray-500" />
                        </div>

                    </div>
                    }

                    {
                        showSearch && userData.role == "user" &&
            
                        <div className="fixed top-[80px] left-0 w-full h-[70px] bg-white shadow-lg flex items-center justify-center gap-[20px] px-[20px] z-[9999]">
                            {/* CITY SECTION */}
                        <div className="w-[30%] h-full flex items-center justify-center overflow-hidden gap-[10px] px-[10px] border-r[2px] border-gray-400 ">
                            <FaLocationDot size={25} className="text-[#ff4d2d]"/>
                            <div className="w-[80%] truncate text-gray-600 flex justify-between">{city} <span>|</span></div>
                        </div>

                        {/* SEARCH SECTION */}
                        <div className="w-[80%]  flex items-center justify-center gap-[10px] ">
                            <CiSearch size={25} className="text-[#ff4d2d]"/>
                            <input type="text" placeholder="Search Delecious Food..." className="outline-none border-none bg-transparent placeholder:text-gray-500" />
                        </div>
                        </div>
                    }

                    <div className="flex items-center gap-[20px] ">
                        {
                            userData.role == "user" &&
                            (showSearch? <RxCross2 size={25} className="text-[#ff4d2d] cursor-pointer" onClick={()=>setShowSearch(false)}/> :
                        <CiSearch size={25} className="text-[#ff4d2d] truncate md:hidden" onClick={() => setShowSearch(true)}/>
                             )
                        }



                        {/* CART */}
                        <div className="cursor-pointer relative">
                            {
                                userData.role == "owner" ?

                                <div className="flex items-center gap-5">
                                {
                                    myShopData && 
                                    <button className="flex items-center bg-[#ff4d2d] text-white p-2 rounded-lg gap-1 cursor-pointer hover:bg-orange-600 transition-colors duration-200"
                                        onClick={() => navigate("/add-item")}>
                                    <FaPlus size={18} />
                                    <span className="hidden md:flex">Add Item</span>
                                    </button>
                                }

                                {/* MY PENDING ORDER */}
                                <>
                                <button className="hidden md:block cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]
                                text-sm font-medium">Pending Orders</button>
                                <span className="hidden md:block absolute right-[-9px] top-[-12px] text-[#ff4d3d]">0</span>
                                </>
                                </div>
                                
                                :

                                <div className="flex items-center gap-5">
                                <FaShoppingCart size={25} className="text-[#ff4d2d]"/>
                                <span className="absolute right-[-9px] top-[-12px] text-[#ff4d3d]">0</span>
                                {/* MY ORDER */}
                                <button className="hidden md:block cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]
                                text-sm font-medium">My Order</button>
                                </div>
                            }
                            
                        </div>

                        

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
                            <p className="cursor-pointer">{userData?.username || "User"}</p>
                            <div className="cursor-pointer">My Order</div>
                            <div className="cursor-pointer text-[#ff4d2d]" onClick={onLogoutClick}>
                                Log Out
                            </div>
                            </div>
                        }                

                    </div>

            </div>
        </>
    )
}

export default Navbar;
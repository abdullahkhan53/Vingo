import { IoIosArrowRoundBack } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useState } from "react";
import { handleAddEditShop } from "../../axios/addEditShop.js";
import { useDispatch } from "react-redux";

function AddShop() {
    const dispatch = useDispatch();
    const {myShopData} = useSelector(state => state.owner)
    const {currCity, currState, currAddress} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [city, setCity] = useState(myShopData?.city || currCity || "")
    const [state, setState] = useState(myShopData?.state || currState || "")
    const [address, setAddress] = useState(myShopData?.address || currAddress || "")
    const [frontendImage, setFrontendImage] = useState(myShopData?.image?.url || null);
    const [backendImage, setBackendImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
           setFrontendImage(URL.createObjectURL(file));
           setBackendImage(file);
        } else {
            console.log("image is required")
        }
    };

    const onFormSubmit = async(e) => {
        e.preventDefault();
        try {
            if(!backendImage){
                alert("Image is required")
                return;
            }
            const formData = new FormData();
            formData.append("name", name);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("address", address);
            formData.append("image", backendImage);

            let result = await  handleAddEditShop(formData, dispatch);
            console.log("Shop added/edited successfully:", result);

        } catch(err) {

            console.log("Error in adding/editing shop:", err);}
    }

    return(
        <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center gradient-to-b from-[#fff9f6] to-[#fff9f6]">     

                <div className="flex items-center  p-4 sm:p-6 gap-5 absolute top-10 left-10">
                    <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" 
                    onClick={() => navigate("/")}/>
                    
                </div>
                <div className="flex flex-col   bg-white mt-[100px] p-4 sm:p-6 w-full max-w-lg rounded-lg shadow-lg rounded-2xl border border-gray-200">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-orange-100 p-4 rounded-full  mb-4">
                            <ImSpoonKnife className="text-[#ff4d2d] w-16 h-16"/>
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ">
                                {myShopData ?  "Edit Your Shop" : "Add Your Restaurant"}
                            </h2>
                        </div>
                    </div>
                <form onSubmit={onFormSubmit}>

                    <div className="">
                        <p className="text-[#ff4d2d] italic mb-8">Please fill in the details below to add your restaurant.</p>
                    </div> 

                        {/* Shop Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopName">
                            Shop Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none " 
                               id="shopName" type="text" placeholder="Enter your shop name"
                               onChange={(e) => setName(e.target.value)}/>
                    </div>

                         {/* Shop Image */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopName">
                            Image
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none" 
                               id="shopName" type="file"
                               onChange={handleImage} />
                               {
                                frontendImage &&
                                <div className="mt-4">
                                   <img src={frontendImage} alt="Shop" className="mt-4 w-ful h-32 object-cover rounded-lg" />
                                </div>
                                 }
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {/* Shop City */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            City
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none" 
                               type="text" placeholder="Enter your City"
                               onChange={(e) => setCity(e.target.value)}
                               value={city}
                               />
                    </div>

                         {/* Shop State */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopState">
                            State
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none" 
                               id="shopState" type="text" placeholder="Enter your State"
                               onChange={(e) => setState(e.target.value)}
                               value={state}
                               />
                    </div>
                    </div>

                     {/* Shop Address */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopAddress">
                            Address
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none" 
                               id="shopAddress" type="text" placeholder="Enter your Address"
                               onChange={(e) => setAddress(e.target.value)}
                               value={address}
                               />
                    </div>

                    <button className="bg-[#ff4d2d] text-white py-2 px-5 sm:px-6 rounded-full hover:bg-orange-600
                    transition-colors duration-200 cursor-pointer"
                    type="submit"
                    >Submit</button>


                </form>
                    
                </div>
        </div>
    )
}

export default AddShop;
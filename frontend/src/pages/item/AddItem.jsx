import { IoIosArrowRoundBack } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAddItem } from "../../axios/addItem.js";

function AddItem() {
    const dispatch = useDispatch();
    const {myShopData} = useSelector(state => state.owner)
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [foodType, setFoodType] = useState("")
    const [category, setCategory] = useState("");
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);

    const categories = [
            "Snack",
            "Main Course",
            "Deserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Pakistani",
            "North Pakistani",
            "Chinees",
            "Fast Food",
            "Others"
        ]

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
            formData.append("image", backendImage);
            formData.append("price", price);
            formData.append("foodType", foodType);
            formData.append("category", category);

            let result = await  handleAddItem(formData, dispatch);
            console.log("Item added successfully:", result);

        } catch(err) {

            console.log("Error in adding/editing item:", err);}
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
                                Add Food
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
                            Food Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none " 
                               id="shopName" type="text" placeholder="Enter your Food name"
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
                         {/* Food Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Price
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none" 
                               type="text"
                               onChange={(e) => setPrice(e.target.value)}
                               value={price}
                               />
                    </div>

                         {/* Food Type */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopState">
                            Food Type
                        </label>
                        <select className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700
                               leading-tight outline-none transition-all duration-200 hover:border-[#ff4d2d] 
                               focus:border-[#ff4d2d] border-none" 
                               id="foodType" 
                               onChange={(e) => setFoodType(e.target.value)}
                               value={foodType}
                               >
                                <option value="veg">veg</option> 
                                <option value="non-veg">non-veg</option> 
                               </select>
                    </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopName">
                            Select Category
                        </label>
                        <select className="w-full px-4 py-2 border-none focus:outline-none round-lg " value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category</option>
                            {categories.map((cate, index) => (
                                <option value={cate} key={index}>{cate}</option>
                            ))}
                        </select>
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

export default AddItem;
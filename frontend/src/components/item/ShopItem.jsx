import React from "react";
import { FaPen, FaTrashAlt  } from "react-icons/fa";
import { handleDeleteItem } from "../../axios/item.js";

function ShopItem({ data }) {

    const onHandleDeleteItem = async() => {
        try{
            await handleDeleteItem(data._id);
            alert("Item deleted successfully")
        } catch(err) {
            console.error(err);
        }
    }

    return(
        
            <div className="w-full max-w-2xl flex  bg-white shadow-lg rounded-lg
                 overflow-hidden border border-orange-200 px-4 py-3 relative">
                    
                    <div className="absolute top-5 right-5 flex gap-4 items-center justify-center">
                    {/* Delete Icon */}
                    <div className=" cursor-pointer rounded-full bg-orange-200 p-2">
                        <FaTrashAlt  size={15} className="text-[#ff4d2d]"
                        onClick={onHandleDeleteItem}/>
                    </div>
                        {/* Edit Icon */}
                    <div className=" cursor-pointer rounded-full bg-orange-200 p-2">
                        <FaPen size={15} className="text-[#ff4d2d]"
                        onClick={() => navigate(`/edit-item/${data._id}`)}/>
                    </div>
                    </div>
                    
                <div className="w-35 h-32 flex-shrink-0 bg-gray-50 overflow-hidden">
                    <img src={data.image.url} alt={data.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between p-3 px-5 flex-1">
                    <div>
                        <h2 className="text-base font-semi-bold text-[#ff4d2d]">{data.name}</h2>
                        <p><span className="font-medium text-gray-70">Category: </span>{data.category}</p>
                        <p><span className="font-medium text-gray-70">Food Type: </span>{data.foodType}</p>
                    </div>
                    <p><span className="font-bold">Price: </span>{data.price}</p>
                </div>
            </div>
    )
}

export default ShopItem;
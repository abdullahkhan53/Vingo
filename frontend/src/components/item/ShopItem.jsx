import React from "react";

function ShopItem({ data }) {
    return(
        
            <div className="w-full max-w-2xl flex  bg-white shadow-lg rounded-lg
                 overflow-hidden border border-orange-200 px-4 py-3">
                <div className="w-35 h-32 flex-shrink-0 bg-gray-50 overflow-hidden">
                    <img src={data.image.url} alt={data.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between p-3 flex-1">
                    <div>
                        <h2 className="text-base font-semi-bold text-[#ff4d2d]">{data.name}</h2>
                        <p><span classname="font-bold">Category: </span>{data.category}</p>
                        <p><span classname="font-bold">Food Type: </span>{data.foodType}</p>
                    </div>
                    <p><span classname="font-bold">Price: </span>{data.price}</p>
                </div>
            </div>
    )
}

export default ShopItem;
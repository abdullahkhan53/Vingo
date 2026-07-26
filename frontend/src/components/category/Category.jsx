import React from "react";

function Category({ data }) {
    return(
        <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] bg-white shadow-xl
         border-2 border-[#ff4d2d] shadow-gray rounded-2xl  shrink-0 overflow-hidden
          gap-[10px] hover:shadow-lg transition-shadow">
            <div className="w-full h-full flex flex-col gap-[10px] cursor-pointer">
                <div className="w-[100%] h-[90%] md:h-[80%] overflow-hidden">
                <img src={data.image} alt={data.category} className="w-[100%] h-full object-cover"/>
            </div>
            <div className="w-[100%] h-[10%] flex items-center justify-center">
                <h1 className="text-gray-800 text-sm md:text-lg font-semibold">{data.category}</h1>
            </div>
            </div>
        </div>
    )
}

export default Category;
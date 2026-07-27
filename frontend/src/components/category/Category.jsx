import React from "react";

function Category({ data }) {

    const  handleCateScroll = (ref, direction) => {
        try {
            if (ref.current) {
            ref.current.scrollBy({
                left: direction == "left" ?  -200 : 200,
                behavior: "smooth"
            })
        }
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] bg-white shadow-xl
         border-2 border-[#ff4d2d] shadow-gray rounded-2xl  shrink-0 overflow-hidden
          gap-[10px] hover:shadow-lg transition-shadow relative hover:translate-y-[-8px] duration-1000">
            <div className="w-full h-full flex flex-col gap-[10px] cursor-pointer">
                <div className="w-[100%] h-[100%]  overflow-hidden hover:scale-[1.2] transition-transform duration-300">
                <img src={data.image} alt={data.category} className="w-[100%] h-full object-cover"/>
            </div>
            <div className="w-[100%] h-[15%] flex items-center justify-center absolute bottom-0 left-0
             bg-white/60 backdrop-blur-md">
                <h1 className="text-gray-800 text-sm md:text-lg font-semibold">{data.category}</h1>
            </div>
            </div>
        </div>
    )
}

export default Category;
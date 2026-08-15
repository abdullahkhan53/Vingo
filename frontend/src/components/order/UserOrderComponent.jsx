import React from "react";

function UserOrderComponent({data}) {
    
    const formatDate = (data) => {
        let date = new Date(data);
        return date.toLocaleString("en-GB",{
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        
    }

    return(
        <div className="bg-white w-full shadow-xl rounded-lg ">
            <div className="flex items-center justify-between p-4 mx-4  mb-2">
                <div>
                    <p className="font-semibold text-sm">Order Id: {data._id.slice(-6)}</p>
                    <p className="text-gray-500 text-sm">Date: {formatDate(data.createdAt)}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{data.paymentMethod.toUpperCase()}</p>
                    <p className="font-semibold italic text-blue-600">{data.shopOrders?.[0].status}</p>
                </div>
            </div>
            <div className="border-gray-400 mx-2  mb-2">
                {
                    data.shopOrders?.map((shopOrder, index) => 
                        <div className="bg-[#fff9f6] p-4 rounded-lg mb-4 overflow-x-auto mx-4" key={index}>
                        <h2 className="font-semibold text-lg mb-2">{shopOrder.shop.name}</h2>
                        <div className="flex gap-2 overflow-x-auto border-b border-gray-500 pb-4">
                            {
                            shopOrder.shopOrderItems.map((item, index) => 
                                <div className="flex-shrink-0 gap-2 w-40 border bg-white  p-2 rounded-lg" key={index}>
                                    <img src={item.item?.image?.url} alt={shopOrder.shop?.name} className="w-full h-25 object-cover rounded-lg mb-1" />
                                    <p className="text-sm font-medium text-gray-600">{item.item.name} </p> 
                                    <span className="text-sm font-bold text-green-600">Qty {item.quantity} x Rs {item.item.price}</span>
                                </div>
                            )
                        }
                        </div>
                        <div className="flex items-center justify-between mt-2 border-b border-gray-400 pb-2">
                            <p className="text-sm font-semibold text-gray-600">Sub Total: Rs{shopOrder.subTotal}</p>
                            <p className="font-semibold italic text-blue-600">{shopOrder.status}</p>
                        </div>
                       
                    </div>
                    )
                }
                 <div className="flex items-center justify-between mt-2 border-b border-gray-400 p-4 mx-2">
                    <p className="text-lg font-semibold text-[#ff4d2d]">Total Amount: Rs/{data.totalAmount}</p>
                    <button className="bg-[#ff4d2d] text-white py-2 px-4 rounded-lg hover:bg-[#ff4d2d] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                         Track Order
                    </button>
                </div>
                
            </div>
        </div>
    )
};

export default UserOrderComponent;
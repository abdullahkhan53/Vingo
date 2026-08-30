import react, { useEffect, useState } from "react";
import { handleGetShopById } from "../../axios/shop";
import { useParams } from "react-router-dom";
import { FaShop } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
// import ItemsByShopId from "./ItemsByShopId";
import ItemsByCity from "../../components/item/ItemsByCity";


function Shop() {

    const { shopId } = useParams();
    const [shopData, setShopData] = useState(null);
    const [ shopItems, setShopItems] = useState(null);

    useEffect( () => {
       async function data () {
            await handleGetShopById(shopId).
            then( ( res ) => {
                console.log(res);
                setShopData(res.shop)
                setShopItems(res.items)
            })
            .catch(err => console.log(err));
         }
         data()
    }, [shopId])

    return (
        <div className="min-h-screen bg-gray-50">
            {
                shopData &&
                <div className="relative w-full h-64 md:h-80 lg:h-96">
                <img src={shopData.image?.url} alt={shopData.name} className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 flex
                flex-col items-center justify-center text-center px-4 ">
                    <FaShop className="text-white text-4xl drop-shadow-md mb-3"/>
                    <h1 className="text-white text-2xl md:text-4xl font-bold mt-2">{shopData.name}</h1>
                </div>

                <div className="flex items-center justify-center gap-3 my-4 text-lg">
                    <IoLocation className="text-[#ff4d2d]" />
                    <span className="text-md text-bold text-gray-600">{shopData.city}</span>
                </div>

                {
                    shopItems && shopItems.length > 0 ? 
                    <div className="flex items-center justify-center flex-wrap gap-5 mx-[20%]">
                        {
                         shopItems.map( (item, index) => (
                          <ItemsByCity data={item} key={index} />
                        ))
                        }
                    </div>                    
                    :
                    ""
                }

                </div>
               
            }
        </div>
    )
}

export default Shop;

//  useEffect( () => {
//        try {
//          if (!shopId || shopId === "undefined") {
//                 console.error("No valid shopId found in URL parameters.");
//                 return;
//             }
//         return handleGetShopById(shopId).then((res) => console.log(res)).catch((err) => console.log(err));
        
//        } catch(err) {
//         console.log(err);
//        }
//     }, [shopId])
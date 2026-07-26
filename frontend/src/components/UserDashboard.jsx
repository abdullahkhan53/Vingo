import Category from "./category/Category";
import { categories } from "../../utils/category.js";
import Navbar from "./Navbar";

function UserDashboard() {
    return(
        <div className="w-screen min-h-screen flex flex-col items-center bg-[#fff9f6] overflow-y-auto">
        <Navbar/>

            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-[110px]">
                <h1 className="text-gray-800 text-4xl mb-4">Inspiration for your first order!</h1>

                {/* Section content goes here */}
                <div className="w-full">
                    {/* Category Component */}
                    <div className="w-full flex items-center gap-4 overflow-x-auto  pb-2">
                        {
                            categories.map((category, index) => {
                                return <Category data={category} key={index}/>;
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserDashboard;
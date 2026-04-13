import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function SignUp () {

    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("")

    const setPassword = () => {
        setShowPassword(prev => !prev)
    } 
    
    return(
        
        <div className="min-h-screen w-full flex item-center justify-center p-4" style={{background: bgColor}}>
            <div className=" bg-white rounded-xl shadow-lg w-full  max-w-md p-8 border-[1px]" style={
                {border:`1px solid ${borderColor}`}}>
                    <h1 className='text-3xl font-bold mb-2' style={{color: primaryColor}}>Vingo</h1>
                    <p className="text-gray-600 mb-8">Create your account to get started with
                        delicious food deliveries
                    </p>

                    {/* full name */}
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-gray-700 font-medium mb-1" >Name</label>
                        <input type="text" name="fullname" id="fullname"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter your full name here.."
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1" >Email</label>
                        <input type="email" name="email" id="email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter your E-mail"
                        />
                    </div>

                    {/* Mobile */}
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1" >Mobile</label>
                        <input type="number" name="mobile" id="mobile"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter your Mobile No."
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1" >Password</label>
                        <div className="relative">
                            <input type={`${showPassword?"text":"password"}`}
                            name="password" id="password"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                            placeholder="Password must be atleast of 6 characters"
                            />
                            <button className="absolute right-3 top-3.5 text-gray-500" onClick={setPassword}>
                                 {showPassword? <FaRegEyeSlash /> : <FaRegEye /> }
                            </button>
                        </div>
                    </div>

                    {/* role */}
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-1" >role</label>
                        <div className="flex gap-2">
                            {
                                ["user", "owner", "deliveryBoy"].map((r) => {
                                     return <button 
                                        className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                                        onClick={() => setRole(r)}
                                        style={
                                            role==r?
                                            {backgroundColor: primaryColor, color:"white"}: 
                                            {border: borderColor, color: "#333"}
                                        }>
                                        {r}</button>
                                })}
                        </div>
                    </div>

                    <button style={{backgroundColor: primaryColor, color:"white"}}>Signup</button>

            </div>
            
        </div>
        
    )
}

export default SignUp;
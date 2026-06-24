import react, { use, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { handleSendEmail, handleSetNewPassword, handleVerifyOtp } from "../axios/forgetPassword.js";


function ForgotPassword(){

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("");

    const setPassword = () => {
        setShowPassword(prev => !prev)
    } 

    const onSentOtp = async() => {
        const data = {
            email,            
        }
        await handleSendEmail(data)
        setStep(2)
    }
    const onVerifyOtp = async() => {
        const data = {
            email,       
            otp,     
        }
        await handleVerifyOtp(data)
        setStep(3)
    }
    const onSetNewPassword = async() => {
        const data = {
            email,
            newPassword,            
        }
        await handleSetNewPassword(data)
        setStep(1)
    }

    return <>
        <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 ">
                <div className="flex items-center gap-4 mb-4">
                    <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/signin")}/>
                    <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">Forgot Password</h1>
                </div>

                {step == 1 && 
                <div>
                    {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1" >Email</label>
                    <input type="email" name="email" id="email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter your E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                    <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer text-white bg-[#ff4d2d] hover:bg-[#e64323]`}
                        onClick={onSentOtp}
                    >Send OTP
                     </button>
                </div>
                }

                {step == 2 && 
                <div>
                    {/* Email */}
                <div className="mb-4">
                    <label htmlFor="otp" className="block text-gray-700 font-medium mb-1" >OTP</label>
                    <input type="text" name="otp" id="otp"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                    />
                </div>
                    <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer text-white bg-[#ff4d2d] hover:bg-[#e64323]`}
                        onClick={onVerifyOtp}
                    >Verify
                     </button>
                </div>
                }

                {step == 3 && 
                <div>
                    {/* Email */}
                    
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1" >New Password</label>
                        <div className="relative">
                            <input type={`${showPassword ? "text" : "password"}`}
                                name="newPassword" id="newPassword"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                                placeholder="Password must be atleast of 6 characters"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                            />
                            <button className="absolute right-3 top-3.5 text-gray-500" onClick={setPassword}>
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                                            
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1" >Confirm Password</label>
                        <div className="relative">
                            <input type={`${showPassword ? "text" : "password"}`}
                                name="confirmPassword" id="confirmPassword"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                                placeholder="Password must be atleast of 6 characters"
                            />
                            <button className="absolute right-3 top-3.5 text-gray-500" onClick={setPassword}>
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                                            
                    </div>

                    <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer text-white bg-[#ff4d2d] hover:bg-[#e64323]`}
                        onClick={onSetNewPassword}
                    > Change Password 
                     </button>
                </div>
                }
            
            </div>
        </div>
    </>
}

export default ForgotPassword;
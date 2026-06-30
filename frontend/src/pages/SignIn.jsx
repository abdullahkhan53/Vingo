import React, { use } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { handleSignin } from "../axios/signin";
import { handleGoogleAuth } from "../axios/googleAuth";
import { ClipLoader } from "react-spinners";

function SignIn() {

    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const setPassword = () => {
        setShowPassword(prev => !prev)
    }

    const onSigninClick = async () => {
        setLoading(true)
        setErr("")
        try {
            const userData = {
            email,
            password: pass,
            }
            await handleSignin(userData);
            setLoading(false)
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    const onGoogleAuthClick = async(req, res) => {
            try {
                setErr("")
                const provider = new GoogleAuthProvider()
                const popUp = await signInWithPopup(auth, provider);
                console.log(popUp);
                console.log(popUp.user.displayName);
                const userData = {
                    email : popUp.user.email,
                }
                const response = await handleGoogleAuth(userData);
            } catch (error) {
                return setErr(error.response.data.message)
            }
        }


    return (

        <div className="min-h-screen w-full flex item-center justify-center p-4" style={{ background: bgColor }}>
            <div className=" bg-white rounded-xl  shadow-lg w-full  max-w-md p-8 border-[1px]" style={
                { border: `1px solid ${borderColor}` }}>
                <h1 className='text-3xl font-bold mb-2' style={{ color: primaryColor }}>Vingo</h1>
                <p className="text-gray-600 mb-8">Create your account to get started with
                    delicious food deliveries
                </p>


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



                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1" >Password</label>
                    <div className="relative">
                        <input type={`${showPassword ? "text" : "password"}`}
                            name="password" id="password"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                            placeholder="Password must be atleast of 6 characters"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />
                        <button className="absolute right-3 top-3.5 text-gray-500" onClick={setPassword}>
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                        {/* Forgo Password */}
                        <div className={`flex justify-end text-[#ff4d2d] mt-2 cursor-pointer`}
                        onClick={() => navigate("/forgot-password")}>
                            <h1>Forgot Password</h1>
                        </div>
                </div>



                <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer text-white bg-[#ff4d2d] hover:bg-[#e64323]`}
                    onClick={onSigninClick}
                >
                    {loading ? <ClipLoader size={20} color="#fff"/> : "Login"}
                </button>
                <p className="text-red-500 text-center">{err ? `*${err}` : ""}</p>

                <button className={`w-full mt-4 mb-4 py-2 px-4 rounded-lg transition duration-200 cursor-pointer flex items-center justify-center gap-2 border-rounded-lg border-gray-400 hover:bg-gray-100`}
                onClick={onGoogleAuthClick}
                > Signin with Google <FcGoogle />
                </button>

                <p onClick={() => navigate("/signup")}
                    className="cursor-pointer w-full flex items-center justify-center"
                >Don't you have an account? &nbsp; <span style={{ color: primaryColor }}>Signup</span></p>

            </div>

        </div>

    )
}

export default SignIn;
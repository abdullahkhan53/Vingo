import React, { use } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { handleSignup } from "../axios/signup";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { handleGoogleAuth } from "../axios/googleAuth";


function SignUp () {

    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass ] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("user");
    const [err, setErr] = useState("");

    const setPassword = () => {
        setShowPassword(prev => !prev)
    } 

    const onSignupClick = async() => {
        // e.preventDefault();
        // if(!username.trim() || !email.trim() || !mobile.trim() || !password.trim() || !role.trim() ){
        //     setErr("Put Details First!");
        //     return;
        // }
        setErr("")
        try {
            const userData = {
            username,
            email,
            mobile,
            password: pass,
            role,
        }
        await handleSignup(userData);
        return console.log("Alright")
        } catch (error) {   
            setErr(error.response.data.message)
        }
    }

    const onGoogleAuthClick = async(req, res) => {
        try {
            if(!mobile){
                return alert("Mobile no required")
            }
            const provider = new GoogleAuthProvider()
            const popUp = await signInWithPopup(auth, provider);
            console.log(popUp);
            console.log(popUp.user.displayName);
            const userData = {
                username : popUp.user.displayName,
                email : popUp.user.email,
                mobile,
                role,
            }
            const response = await handleGoogleAuth(userData);
        } catch (error) {
            return res.status(401).josn({message: "Error in handle google auth", eror})
        }
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
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-1" >Name</label>
                        <input type="text" name="username" id="username"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter your full name here.."
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1" >Email</label>
                        <input type="email" name="email" id="email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter your E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        />
                    </div>

                    {/* Mobile */}
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1" >Mobile</label>
                        <input type="number" name="mobile" id="mobile"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                        placeholder="Enter your Mobile No."
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                        required
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
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
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
                                            {borderColor: borderColor, color: "#333"}
                                        }
                                        type='button'>
                                        {r}</button>
                                })}
                        </div>
                    </div>

                    <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer text-white bg-[#ff4d2d] hover:bg-[#e64323]`}
                    onClick={onSignupClick}
                        >Signup
                     </button>
                     <p className="text-red-500 text-center m-5">{err ? `*${err}` : ""}</p>

                    <button className={`w-full mt-4 mb-4 py-2 px-4 rounded-lg transition duration-200 cursor-pointer flex items-center justify-center gap-2 border-rounded-lg border-gray-400 hover:bg-gray-100`}
                        onClick={onGoogleAuthClick}
                        > Signup with Google <FcGoogle />
                     </button>

                     <p onClick={() => navigate("/signin")} 
                        className="cursor-pointer w-full flex items-center justify-center"
                        >Already have an account? &nbsp; <span style={{color: primaryColor}}>Signin</span></p>   

            </div>
            
        </div>
        
    )
}

export default SignUp;
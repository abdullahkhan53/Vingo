import jwt from "jsonwebtoken"

const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(req.cookies)
        console.log("IS AUTH WORKING")
        if(!token){
            return res.status(400).json({message: "token not found"})
        }
        const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decodeToken){
            return res.status(400).json({message: "token not verify"})
        }
        console.log(decodeToken);
        req.userId = decodeToken.userId;
        next()
    } catch (error) {
        res.status(500).json({message: "Error in isAuth Middleware"});
    }

}

export default isAuth;
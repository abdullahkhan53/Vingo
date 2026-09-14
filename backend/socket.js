import User from "./models/userModel.js"

export const socketHandler = (io) => {
    io.on("connection", (socket) => {

        socket.on("identity", async({userId}) => {
            try {
                console.log("User connected with socket id: ", socket.id)
                console.log("User id: ", userId)
                const user = await User.findByIdAndUpdate( userId, {
                    socketId: socket.id,
                    isOnline: true
                }, {new: true});
                console.log("User updated: ", user)
            } catch (error) {
                console.log(error)
            }
        })

        // socket.on("disconnect", async() => {
        //     try {
        //         const user = await User.findOneAndUpdate({socketId: socket.id}, {
        //             socketId: null,
        //             isOnline: false
        //         })
        //     } catch (error) {
        //         console.log(error)
        //     }
        // })

    })
}
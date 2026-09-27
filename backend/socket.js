import User from "./models/userModel.js";

// Global map to avoid constant DB writes (In-Memory Lookup)
export const userSocketMap = {}; 

export const socketHandler = (io) => {
    io.on("connection", (socket) => {

        socket.on("identity", async ({ userId }) => {
            try {
                if (!userId) return;

                console.log(`User connected | socketId: ${socket.id} | userId: ${userId}`);
                
                userSocketMap[userId] = socket.id;

                socket.userId = userId;

                await User.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                    isOnline: true
                });

            } catch (error) {
                console.error("Error in identity event:", error);
            }
        });

        socket.on('updateLocation', async({latitude, longitude, userId}) => {
            try {
                let user = await User.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    isOnline: true,
                    socketId: socket.id
                })

           if(user) {
                io.emit('updateDeliveryBoyLocation', {
                deliveryBoyId: userId,
                latitude,
                longitude
            })
        }

            } catch(err) {
                console.log("Error updating location: ", err);
            }
        })

        

        socket.on("disconnect", async () => {
            try {
                const userId = socket.userId;
                console.log(`User disconnected | socketId: ${socket.id}`);

                if (userId) {
                    // Prevent race condition: Clean memory ONLY IF current socket matches
                    if (userSocketMap[userId] === socket.id) {
                        delete userSocketMap[userId];
                    }

                    // Clean DB ONLY IF socketId hasn't changed to a newer connection
                    await User.findOneAndUpdate(
                        { _id: userId, socketId: socket.id },
                        { socketId: null, isOnline: false }
                    );
                }
            } catch (error) {
                console.error("Error in disconnect event:", error);
            }
        });

    });
};
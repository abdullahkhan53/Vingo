import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: false,
        currCity: null,
        currState: null,
        currAddress: null,
        shopsByCity: null,
        cartItems: [],
        totalPrice: 0,
        myOrders: []
    },
    reducers: {
            setUserData: (state, action) => {
                state.userData = action.payload
            },
            setCity: (state, action) => {
                state.currCity = action.payload
            },
            setState: (state, action) => {
                state.currState = action.payload
            },
            setAddress: (state, action) => {
                state.currAddress = action.payload
            },
            setShopsByCity: (state, action) => {
                state.shopsByCity = action.payload
            },
            setAddToCart: (state, action) => {
                const cartItem  = action.payload;
                const existingItem = state.cartItems.find(item => item.id === cartItem.id);
                if(existingItem) {
                    existingItem.quantity += cartItem.quantity;
                } else {
                    state.cartItems.push(cartItem);
                }
                state.totalPrice = state.cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
            },
            setCartQuantity: (state, action) => {
                const {id, quantity} = action.payload;
                let existingItem = state.cartItems.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity = quantity;
                }
                state.totalPrice = state.cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
                
            },
            removeFromCart: (state, action) => {
                const id = action.payload;
                state.cartItems = state.cartItems.filter(i => i.id !== id);
                state.totalPrice = state.cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
            },
            setMyOrders: (state, action) => {
                state.myOrders = action.payload;
            },
            setAddLastOrder: (state, action) => {
                state.myOrders = [action.payload, ...state.myOrders];
            },
            setUpdateOrderStatus: (state, action) => {
                const {orderId, shopId, status} = action.payload;
                const order = state.myOrders.find(order => order._id === orderId);
                if(order) {
                    if(order.shopOrders && order.shopOrders[0].shop === shopId) {
                        order.shopOrders[0].status = status;
                    }
                }  
            }
    }
});

export const {setUserData, setCity, setState, setAddress, setShopsByCity,
             setAddToCart, setCartQuantity, removeFromCart, setMyOrders,
             setAddLastOrder, setUpdateOrderStatus
            } = userSlice.actions;
export default userSlice.reducer;


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
            }



    }
});

export const {setUserData, setCity, setState, setAddress, setShopsByCity, setAddToCart} = userSlice.actions;
export default userSlice.reducer;


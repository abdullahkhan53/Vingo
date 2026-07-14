import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: false,
        currCity: null,
        currState: null,
        currAddress: null,
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
            }
    }
});

export const {setUserData, setCity, setState, setAddress} = userSlice.actions;
export default userSlice.reducer;


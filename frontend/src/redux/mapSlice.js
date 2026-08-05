import {createSlice} from "@reduxjs/toolkit"

const mapSlice = createSlice({
    name: "map",
    initialState: {
       location: {
        text: null,
        lat: null,
        lng: null,
       }
    },
    reducers: {
            setLocation: (state, action) => {
                let {lat, lng} = action.payload;
                state.location.lat = lat;
                state.location.lng = lng;
            },
            setLocationText: (state, action) => {
                state.location.text = action.payload;
            }
    }
});

export const { setLocation, setLocationText} = mapSlice.actions;
export default mapSlice.reducer;


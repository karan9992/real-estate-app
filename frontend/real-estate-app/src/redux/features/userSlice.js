import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    location: null,
    id: null,
    propertisesInterested: null,
    role: null,
    filter: {
        bedrooms: null,
        minPrice: null,
        maxPrice: null

    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload.name;
        },
        setFilter: (state, action) => {
            state.filter.bedrooms = action.payload.bedrooms;
            state.filter.minPrice = action.payload.minPrice;
            state.filter.maxPrice = action.payload.maxPrice;


        },
        setId: (state, action) => {
            state.id = action.payload.id;
        },
        setPropertiesInterested: (state, action) => {
            state.propertisesInterested = action.payload.propertisesInterested;
        },
        setRole: (state, action) => {
            state.role = action.payload.role;
        },

        clearUser: (state) => {
            state.name = null;
            state.location = null;
            state.id = null;
            state.propertisesInterested = null
            state.role = null
        },
        setLocation: (state, action) => {
            state.location = action.payload.location;
        },
        clearFilter:(state, action) => {
            state.filter.bedrooms = null;
            state.filter.minPrice = null;
            state.filter.maxPrice = null;
            state.location = null


        }
    },
});

export const { setName, setFilter, clearFilter, setPropertiesInterested, clearUser, setId, setLocation, setRole } = userSlice.actions;
export default userSlice.reducer;

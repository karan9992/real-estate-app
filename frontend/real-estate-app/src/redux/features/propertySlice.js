import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    currentProperty: {},   // for single property (like for editing/viewing)
    propertyList: [],      // for multiple properties (listing)
  },
  reducers: {
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload;
    },
    setPropertyList: (state, action) => {
      state.propertyList = action.payload;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = {};
    }
  },
});

export const { setCurrentProperty, setPropertyList, clearCurrentProperty } =
  propertySlice.actions;

export default propertySlice.reducer;

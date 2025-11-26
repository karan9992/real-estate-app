import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './features/userSlice'
import propertyReducer from'./features/propertySlice'

export const store = configureStore({
  reducer: {
     user: userReducer,
       properties: propertyReducer,
  },
    devTools: true,
})
import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../features/Userslice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, userSliceReducer)
export const store=configureStore({
    reducer:{
        user:persistedReducer,
        middleware: [thunk]
    }
})

export const persistor = persistStore(store)
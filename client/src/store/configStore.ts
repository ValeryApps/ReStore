// import { createStore } from "redux"
// import { counterReduct } from "./counterReducer"

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "./account/accountSlice";
import { basketSlice } from "./basket/basketSlice";
import { catalogSlice } from "./catalog/catalogSlice";
import { counterSlice } from "./counterSlice";

// export const configurationStore = () => {
//     return createStore(counterReduct)
// }

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
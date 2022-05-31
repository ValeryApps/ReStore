import { createSlice } from "@reduxjs/toolkit";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
export interface CounterState {
    data: number;
    title: string
}
export const IncrementAction = (amount: number) => {
    return {
        type: INCREMENT,
        payload: amount
    }
}
export const DecrementAction = (amount: number) => {
    return {
        type: DECREMENT,
        payload: amount
    }
}

export const initialState: CounterState = {
    data: 340,
    title: "This is the title"
}
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.data -= action.payload
        }
    }
})

export const { increment, decrement } = counterSlice.actions;
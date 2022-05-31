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
export const counterReduct = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case INCREMENT:
            return {
                ...state,
                data: state.data + payload
            }
        case DECREMENT:
            return {
                ...state,
                data: state.data - payload
            }
        default:
            return state;
    }
}
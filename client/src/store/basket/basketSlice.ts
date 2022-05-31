import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Basket } from "../../models/basket";
import { getCookie } from "../../util/util";

export interface BasketState {
    basket: Basket | null;
    status: string
}
const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkApi) => {
        try {
            return await agent.basket.get();
        } catch (error: any) {
            thunkApi.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId'))
                return false;
        }
    }
)

export const addItemToBasketAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
    'basket/addItemToBasketAsync',
    async ({ productId, quantity }, thunkApi) => {
        try {
            return await agent.basket.post(productId, quantity)
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.data)
        }
    },


)

export const removeItemAsync = createAsyncThunk<void, { productId: number, quantity: number, name?: string }>(
    'basket/removeItemAsync',
    async ({ productId, quantity }, thunkApi) => {
        try {
            await agent.basket.delete(productId, quantity);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })

        }
    }
)
export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: state => {
            state.basket = null;
        }

    },
    extraReducers: (builder => {
        builder.addCase(addItemToBasketAsync.pending, (state, action) => {
            state.status = `pending${action.meta.arg.productId}`
        });

        builder.addCase(removeItemAsync.pending, (state, action) => {
            state.status = `pendingRemoveItem${action.meta.arg.productId}${action.meta.arg.name}`
        });
        builder.addCase(removeItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            if (state.basket?.items[itemIndex]) {
                state.basket!.items[itemIndex].quantity -= quantity;
            }
            if (state.basket?.items[itemIndex].quantity === 0) {
                state.basket!.items.splice(itemIndex, 1)
            }
            state.status = 'idle'
        });
        builder.addCase(removeItemAsync.rejected, (state, action) => {
            console.log(action.payload);

            state.status = 'idle'
        });
        builder.addMatcher(isAnyOf(addItemToBasketAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload
            state.status = 'idle'
        });
        builder.addMatcher(isAnyOf(addItemToBasketAsync.rejected, fetchBasketAsync.rejected), (state) => {
            state.status = 'idle'
        });
    })
})

export const { setBasket, clearBasket } = basketSlice.actions;
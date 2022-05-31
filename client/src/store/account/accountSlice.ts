import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../../api/agent";
import { User } from "../../models/user";
import { setBasket } from "../basket/basketSlice";

export interface AccountState {
    user: User | null
}

const initialState: AccountState = {
    user: null
}

export const signInUserAsync = createAsyncThunk<User, FieldValues>(
    'account/signiUser',
    async (data, thunkApi) => {
        try {
            const userDto = await agent.account.login(data);
            const { basket, ...user } = userDto
            console.log(basket);

            if (basket) {
                thunkApi.dispatch(setBasket(basket));
            }
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            thunkApi.rejectWithValue({ error: error.data })

        }
    }
)

export const fetchCurrentUserAsync = createAsyncThunk<User>(
    'account/fetchCurrrentUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.account.getCurrentUser();
            const { basket, ...user } = userDto;
            if (basket) {
                thunkApi.dispatch(setBasket(basket))
            };
            localStorage.setItem('user', JSON.stringify(user))
            return user;
        } catch (error: any) {


            thunkApi.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            // console.log(localStorage.getItem('user'));

            if (!localStorage.getItem('user'))
                return false;
        }
    }
);
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUserAsync.rejected, state => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Your section is expired');
            history.push('./')

        });
        builder.addMatcher(isAnyOf(signInUserAsync.fulfilled, fetchCurrentUserAsync.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUserAsync.rejected), (_, action) => {
            console.log(action.error);
        })
    })
})

export const { logout, setUser } = accountSlice.actions;
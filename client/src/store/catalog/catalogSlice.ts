import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { MetaData } from "../../models/pagination";
import { Product, ProductParams } from "../../models/Product";
import { RootState } from "../configStore";


export interface CatalogState {
    productsLoaded: Boolean,
    status: string,
    filtersLoaded: Boolean,
    types: string[];
    brands: string[];
    productParams: ProductParams;
    metaData: MetaData | null
}
const getAxioParams = (productParams: ProductParams) => {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    if (productParams.searchTerm)
        params.append('searchTerm', productParams.searchTerm.toString());
    if (productParams.orderBy)
        params.append('orderBy', productParams.orderBy.toString());
    if (productParams.brands?.length)
        params.append('brands', productParams.brands.toString());
    if (productParams.types?.length)
        params.append('type', productParams.types.toString());
    return params;
}

export const productAdapter = createEntityAdapter<Product>();
export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    'products/fetchProductAsync',
    async (_, thunkApi) => {
        const params = getAxioParams(thunkApi.getState().catalog.productParams);
        try {
            const response = await agent.catalog.list(params);
            thunkApi.dispatch(setMetadata(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })

        }
    }
)

export const fetchProductByIdAsync = createAsyncThunk<Product, number>('catalog/fetchProductById', async (id: number, thunkApi) => {
    try {
        return await agent.catalog.detail(id);
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data })
    }
})

export const fetchFilterAsync = createAsyncThunk(
    'catalog/fetchFilterAsync',
    async (_, thunkApi) => {
        try {
            return await agent.catalog.fetchFilter();
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }

    }
)
const initParams = () => ({
    pageNumber: 1,
    pageSize: 6,
    orderBy: 'name',
    brands: [],
    types: []
})

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        status: 'idle',
        filtersLoaded: false,
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 }
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload }
        },
        resetProductParams: (state, action) => {
            state.productParams = initParams();
        },
        setMetadata: (state, action) => {
            state.metaData = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, state => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);

            state.status = 'idle';
        });
        builder.addCase(fetchProductByIdAsync.pending, state => {
            state.status = 'pending';
        });
        builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductByIdAsync.rejected, (state, action) => {
            // console.log(action);
            state.status = 'idle';
        });
        builder.addCase(fetchFilterAsync.pending, state => {
            state.status = 'pendingFetchfilter'
        });
        builder.addCase(fetchFilterAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilterAsync.rejected, (state, action) => {
            console.log(action.error);
            state.status = 'idle'
        })
    })
})

export const productSelector = productAdapter.getSelectors((state: RootState) => state.catalog);
export const { setProductParams, resetProductParams, setMetadata, setPageNumber } = catalogSlice.actions;
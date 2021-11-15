import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface sliceType {
	loading: boolean,
	items: any[],
	error: string | null,
}

const initialState: sliceType = {
	loading: true,
	items: [],
	error: null,
}

export const getShoppingCart = createAsyncThunk(
	'shoppingCart/getShoppingCart',
	async (jwt: string, thunkAPI) => {
		const { data }: any = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`,{
			headers: {
				Authorization: `bearer ${jwt}`
			},
		})
		return data.shoppingCartItems;
	}
);

export const addShoppingCart = createAsyncThunk(
	'shoppingCart/addShoppingCart',
	async (parameters: {jwt: string, touristRouteId: string}, thunkAPI) => {
		const { data }: any = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`,{
			touristRouteId: parameters.touristRouteId
		},{
			headers: {
				Authorization: `bearer ${parameters.jwt}`
			},
		})
		return data.shoppingCartItems;
	}
);

export const checkOutShoppingCart = createAsyncThunk(
	'shoppingCart/checkOutShoppingCart',
	async (jwt: string, thunkAPI) => {
		const { data }: any = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`,null,{
			headers: {
				Authorization: `bearer ${jwt}`
			},
		})
		return data;
	}
);

export const clearShoppingCart = createAsyncThunk(
	'shoppingCart/deleteShoppingCart',
	async (parameters: {jwt: string, itemIds: number[]}, thunkAPI) => {
		return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(",")})`,{
			headers: {
				Authorization: `bearer ${parameters.jwt}`
			},
		})
	}
);

export const shoppingCartSlice = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: { },
	extraReducers:{
		[getShoppingCart.pending.type]: (state) => {
			state.loading = true
		},
		[getShoppingCart.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.items = action.payload;
			state.error = null;
		},
		[getShoppingCart.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[addShoppingCart.pending.type]: (state) => {
			state.loading = true
		},
		[addShoppingCart.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.items = action.payload;
			state.error = null;
		},
		[addShoppingCart.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[checkOutShoppingCart.pending.type]: (state) => {
			state.loading = true
		},
		[checkOutShoppingCart.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.items = [];
			state.error = null;
		},
		[checkOutShoppingCart.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[clearShoppingCart.pending.type]: (state) => {
			state.loading = true
		},
		[clearShoppingCart.fulfilled.type]: (state) => {
			state.loading = false;
			state.items = [];
			state.error = null;
		},
		[clearShoppingCart.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	}
})
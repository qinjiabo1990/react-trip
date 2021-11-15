import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { checkOutShoppingCart } from '../shoppingCart/slice'

interface sliceType {
	loading: boolean,
	currentOrder: any,
	error: string | null,
}

const initialState: sliceType = {
	loading: false,
	currentOrder: null,
	error: null,
}

export const placeOrder = createAsyncThunk(
	'order/placeOrder',
	async (parameters: {jwt: string, orderId: string}, thunkAPI) => {
		const { data } = await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`, null,
		{
			headers: {
				Authorization: `bearer ${parameters.jwt}`
			},
		})
		return data
	}
);

export const placeOrderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: { },
	extraReducers:{
		[placeOrder.pending.type]: (state) => {
			state.loading = true
		},
		[placeOrder.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.currentOrder = action.payload;
			state.error = null;
		},
		[placeOrder.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[checkOutShoppingCart.pending.type]: (state) => {
			state.loading = true
		},
		[checkOutShoppingCart.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.currentOrder = action.payload;
			state.error = null;
		},
		[checkOutShoppingCart.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	}
	 
})
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface sliceType {
	loading: boolean,
	product: any,
	error: string | null,
}

const initialState: sliceType = {
	loading: true,
	product: null,
	error: null,
}

export const getProductDetail = createAsyncThunk(
	'productDetail/getProductDetail',
	async (touristRouteId: string, thunkAPI) => {
		const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
		return data
	}
);

export const productDetailSlice = createSlice({
	name: 'productDetail',
	initialState,
	reducers: {},
	extraReducers:{
		[getProductDetail.pending.type]: (state) => {
			// 由于使用了immer(in redux toolkit)，将state变成mutable
			// 不然应该是return {...state, loading: true} 
			state.loading = true
		},
		[getProductDetail.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.product = action.payload;
			state.error = null;
		},
		[getProductDetail.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	}
	 
})
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface sliceType {
	loading: boolean,
	data: any,
	error: string | null,
	pagination: any
}

const initialState: sliceType = {
	loading: true,
	data: null,
	error: null,
	pagination: null
}

export const getProductSearch = createAsyncThunk(
	'productSearch/getProductSearch',
	async (paramaters: {
		keywords: string,
		nextPage: number | string,
		pageSize: number | string,
	}, thunkAPI) => {
		let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`
		if (paramaters.keywords){
			url += `&keyword=${paramaters.keywords}`;
		}
		const response = await axios.get(url);
		return {
			data: response.data,
			pagination: JSON.parse(response.headers["x-pagination"])
		}
	}
);

export const productSearchSlice = createSlice({
	name: 'productSearch',
	initialState,
	reducers: {
		
	},
	extraReducers:{
		[getProductSearch.pending.type]: (state) => {
			state.loading = true
		},
		[getProductSearch.fulfilled.type]: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.error = null;
		},
		[getProductSearch.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	}
})
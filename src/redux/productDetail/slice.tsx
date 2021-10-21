import {createSlice} from '@reduxjs/toolkit'

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

export const productDetailSlice = createSlice({
	name: 'productDetail',
	initialState,
	reducers: {
		fetchStart: (state) => {
			state.loading = true
		},
		fetchSuccess: (state, action) => {
			state.loading = false;
			state.product = action.payload;
			state.error = null;
		},
		fetchFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	}
})
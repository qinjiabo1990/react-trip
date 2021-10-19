import {createSlice} from '@reduxjs/toolkit'

interface sliceType {
	loading: boolean,
	error: string | null,
	data: any
}

const initialState: sliceType = {
	loading: true,
	error: null,
	data: null
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
			state.data = action.payload;
			state.error = null;
		},
		fetchFail: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		}
	}
})
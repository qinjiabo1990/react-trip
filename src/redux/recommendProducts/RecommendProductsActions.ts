import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"

export const FETCH_RECOMMEND_PRODUCTS_STATE = 'fetch_recommend_products_state'
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'fetch_recommend_products_success'
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'fetch_recommend_products_fail'



interface FetchRecommendProductState {
	type: typeof FETCH_RECOMMEND_PRODUCTS_STATE
}

interface FetchRecommendProductSuccess {
	type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
	payload: any
}

interface FetchRecommendProductFail {
	type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
	payload: any
}

export type RecommendProductAction = FetchRecommendProductState | FetchRecommendProductSuccess | FetchRecommendProductFail



export const fetchRecommendProductStateActionCreator = ():FetchRecommendProductState => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_STATE
	}
}

export const fetchRecommendProductSuccessStateActionCreator = (data):FetchRecommendProductSuccess => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
		payload: data
	}
}

export const fetchRecommendProductFailActionCreator = (error):FetchRecommendProductFail => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_FAIL,
		payload: error
	}
}

export const giveMeDataAction = ():ThunkAction<
	void, 
	RootState, 
	unknown, 
	RecommendProductAction
> => async (dispatch, getState) => {
	dispatch(fetchRecommendProductStateActionCreator())
	try {
		const {data} = await axios.get<any>('http://123.56.149.216:8080/api/productCollections');
		dispatch(fetchRecommendProductSuccessStateActionCreator(data));
	} catch (error) {
		dispatch(fetchRecommendProductFailActionCreator(error.message));
	}
}
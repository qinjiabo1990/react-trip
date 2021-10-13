/* eslint-disable import/no-anonymous-default-export */
import {FETCH_RECOMMEND_PRODUCTS_FAIL, FETCH_RECOMMEND_PRODUCTS_STATE, FETCH_RECOMMEND_PRODUCTS_SUCCESS, RecommendProductAction} from './RecommendProductsActions'

interface recommendProductState {
	productList: any[],
	loading: boolean,
	error: string | null,
}

const defaultRecommendProducts: recommendProductState = {
	productList: [],
	loading: true,
	error: null,
}

export default (state=defaultRecommendProducts, action: RecommendProductAction) => {
	switch(action.type) {
		case FETCH_RECOMMEND_PRODUCTS_STATE:
			return {...state, loading: true}
		case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
			return {...state, loading:false, productList: action.payload}
		case FETCH_RECOMMEND_PRODUCTS_FAIL:
			return {...state, loading:false, error: action.payload}
		default:
			return state;
	}
}
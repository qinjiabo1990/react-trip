/* eslint-disable import/no-anonymous-default-export */
import { 
	FETCH_RECOMMEND_PRODUCTS_FAIL, 
	FETCH_RECOMMEND_PRODUCTS_STATE, 
	FETCH_RECOMMEND_PRODUCTS_SUCCESS, RecommendProductAction 
} from "./RecommendProductsActions";

interface recommendProductState {
	productList: any[],
	loading: boolean,
	error: string | null,
}

const defaultRecommendProduct: recommendProductState = {
	productList: [],
	loading: true,
	error: null,
}

export default (state = defaultRecommendProduct, action: RecommendProductAction) => {
	switch (action.type) {
		case FETCH_RECOMMEND_PRODUCTS_STATE:
			return { ...state }
		case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
			return { ...state, productList: action.payload, loading: false }
		case FETCH_RECOMMEND_PRODUCTS_FAIL:
			return { ...state, error: action.payload, loading: false }
		default:
			return state;
	}
}
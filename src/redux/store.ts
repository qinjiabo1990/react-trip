import { createStore, applyMiddleware } from "redux";
import languageReducer from './language/languageReducer'
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from 'redux-thunk'
import { actionLog } from "./middleware/actionLog";
import { languageChangeMiddle } from "./middleware/languangeChangeMiddle";
import { productDetailSlice } from "./productDetail/slice"; 
import { productSearchSlice } from "./productSearch/slice";
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
	whitelist:['user']
}

const rootReducer = combineReducers({
	language: languageReducer,
	recommendProducts: recommendProductsReducer,
	productDetail: productDetailSlice.reducer,
	productSearch: productSearchSlice.reducer,
	user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

//const store = createStore(rootReducer, applyMiddleware(thunk, actionLog, languageChangeMiddle));
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), actionLog],
	devTools: true,
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default {store, persistor};
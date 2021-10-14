import { Middleware } from "redux"

export const actionLog: Middleware = (store) => (next) => (action) => {
	console.log("current State: ", store.getState());
	console.log("fire actin: ", action);
	next(action);
	console.log("updated State: ", store.getState());
}
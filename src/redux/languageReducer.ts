/* eslint-disable import/no-anonymous-default-export */

export interface LanguageState {
	language: "en" | "zh";
	languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
	language: "en",
	languageList: [
		{ name: '中文', code: 'zh' },
		{ name: 'English', code: 'en' },
	],
};

export default (state = defaultState, action: any) => {
	if (action.type === "change_language") {
		const newState = {...state};
		newState.language = action.payload;
		return newState;
	}
	return state;
}
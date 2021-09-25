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
	switch (action.type) {
		case 'change_language':
			return {...state, language: action.payload};
		case 'add_language':
			return {...state, languageList: [...state.languageList, action.payload]}
	}
	return state;
}
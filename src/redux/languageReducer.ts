/* eslint-disable import/no-anonymous-default-export */
import i18n from 'i18next'

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
			i18n.changeLanguage(action.payload);
			return {...state, language: action.payload};
		case 'add_language':
			return {...state, languageList: [...state.languageList, action.payload]}
	}
	return state;
}
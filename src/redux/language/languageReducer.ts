/* eslint-disable import/no-anonymous-default-export */
import i18n from 'i18next'
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes } from './languageActions';

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

export default (state = defaultState, action:LanguageActionTypes) => {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			// i18n.changeLanguage(action.payload); // moving this in middle because it has side-effect
			return {...state, language: action.payload};
		case ADD_LANGUAGE:
			return {...state, languageList: [...state.languageList, action.payload]}
	}
	return state;
}
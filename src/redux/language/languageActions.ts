
export const CHANGE_LANGUAGE = 'change_language'
export const ADD_LANGUAGE = 'add_language'

interface ChangeLanguageAction {
	type: typeof CHANGE_LANGUAGE,
	payload: "zh" | "en"
}

interface AddLanguageAction {
	type: typeof ADD_LANGUAGE,
	payload: {
		code: string,
		name: string
	}
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageAction = (language_code: "zh" | "en"):ChangeLanguageAction => {
	return {
		type: CHANGE_LANGUAGE,
		payload: language_code
	}
}

export const addLanguageAction = (code: string, name: string):AddLanguageAction => {
	return {
		type: ADD_LANGUAGE,
		payload: {code, name}
	}
}
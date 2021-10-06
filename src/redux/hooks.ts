import {useSelector as useReactSelector, TypedUseSelectorHook} from 'react-redux'
import type {RootState} from './store'

export const useSelector: TypedUseSelectorHook<RootState> = useReactSelector;
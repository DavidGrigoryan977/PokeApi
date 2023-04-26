import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { initialPokeData, pokemonsDataReducer } from "./slices";

const store = createStore(
  combineReducers({
    pokemonsData: pokemonsDataReducer,
  }),
  {
    pokemonsData: initialPokeData,
  },
  applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

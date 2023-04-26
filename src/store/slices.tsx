import { fetchDataFromAPI, getModalImg } from "./fetchApi";
import { modalPokeDispatch, renderPokemonsDispatch } from "./dispatchs";
import { Data } from "../components/modal/modal";
import { AppDispatch } from "./store";

export type Pokemon = {
  name: string;
  url: string;
};

export interface StateType {
  pokemonsData: {
    data: Pokemon[];
    modalPoke: Data;
  };
}

export interface PokemonPreviewItem {
  name: string;
  url: string;
}

export const initialPokeData = {
  data: [],
  modalPoke: null,
};

export const loadModalPoke = (url: string) => (dispatch: AppDispatch) =>
  getModalImg(url).then((img) => {
    dispatch(modalPokeDispatch(img));
  });

export const loadData = (fetchCount: number) => (dispatch: AppDispatch) =>
  fetchDataFromAPI(fetchCount).then((data) => {
    if (data) {
      dispatch(renderPokemonsDispatch(data));
    }
  });

export const pokemonsDataReducer = (state: any = [], action: any) => {
  if (action.type === "DATA_FETCH") {
    return {
      ...state,
      data: action.payload.results,
    };
  }
  if (action.type === "MODAL_POKE_PIC_FETCH") {
    return {
      ...state,
      modalPoke: action.payload,
    };
  }
  return state;
};

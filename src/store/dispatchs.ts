export const renderPokemonsDispatch = (action: any) => ({
  type: 'DATA_FETCH',
  payload: action,
});
export const modalPokeDispatch = (url: string) => ({
  type: 'MODAL_POKE_PIC_FETCH',
  payload: url,
});

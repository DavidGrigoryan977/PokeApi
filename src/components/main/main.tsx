import React, { useEffect, useState } from 'react';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cards from '../card/cards';
import ModalView from '../modal/modal';
import { loadData, loadModalPoke } from '../../store/slices';
import styles from './styles.module.scss';
import TypesMenu from '../pokemonTypes/pokemonTypes';
import { PokemonType, StateType } from '../../types/types';

const POKEMONS_COUNT = 1281;

function Main() {
  const [fetchOffset, setFetchOffset] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const pokemonModal = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.modalPoke
  );
  const pokemons = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.data
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(loadData(fetchOffset));
  }, [dispatch, fetchOffset]);

  const handleOpen = (url: string) => {
    setOpen(true);
    if (url) {
      dispatch(loadModalPoke(url));
    }
  };

  const handleClose = (isOpen: boolean) => setOpen(isOpen);

  const handleClickNext = () => {
    if (fetchOffset <= POKEMONS_COUNT) {
      setFetchOffset((prev) => prev + 20);
    }
    dispatch(loadData(fetchOffset));
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const handleClickPrev = () => {
    if (fetchOffset > 0) {
      setFetchOffset((prev) => prev - 20);
    }
    dispatch(loadData(fetchOffset));
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };
  if (!pokemons) {
    return null;
  }
  return (
    <div className={styles.mainWrapper}>
      <img
        className={styles.pokemonLogo}
        src="http://surl.li/gmzcb"
        alt="pokemon-logo"
      />
      <div className={styles.buttonsWrapper}>
        <Button
          disabled={fetchOffset === 0 || pathname.slice(1) !== 'home'}
          variant="contained"
          onClick={handleClickPrev}
        >
          <ArrowCircleLeft className={styles.ArrowCircle} />
        </Button>
        <Button
          disabled={
            fetchOffset >= POKEMONS_COUNT - 1 || pathname.slice(1) !== 'home'
          }
          variant="contained"
          onClick={handleClickNext}
        >
          <ArrowCircleRight className={styles.ArrowCircle} />
        </Button>
      </div>
      <TypesMenu offset={fetchOffset} />
      <div className={styles.cardsWrapper}>
        {pokemons.length ? (
          pokemons.map((item: PokemonType) => (
            <Cards
              key={item.name}
              name={item.name}
              src={item.url}
              onClick={() => handleOpen(item.url)}
            />
          ))
        ) : (
          <div className={styles.noDataBlock}>
            <ErrorIcon
              sx={{
                width: '100px',
                height: '100px',
                color: '#1976d2',
              }}
            />
            <h1>No Data</h1>
          </div>
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          disabled={fetchOffset === 0 || pathname.slice(1) !== 'home'}
          variant="contained"
          onClick={handleClickPrev}
        >
          <ArrowCircleLeft className={styles.ArrowCircle} />
        </Button>
        <Button
          disabled={
            fetchOffset >= POKEMONS_COUNT - 1 || pathname.slice(1) !== 'home'
          }
          variant="contained"
          onClick={handleClickNext}
        >
          <ArrowCircleRight className={styles.ArrowCircle} />
        </Button>
      </div>
      <ModalView data={pokemonModal} handleClose={handleClose} open={open} />
    </div>
  );
}

export default Main;

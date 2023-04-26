import * as React from "react";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Cards from "../card/cards";
import ModalView from "../modal/modal";
import {
  loadData,
  loadModalPoke,
  PokemonPreviewItem,
  StateType,
} from "../../store/slices";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../store/store";

const POKEMONS_COUNT = 1281;

function Main() {
  const [fetchOffset, setFetchOffset] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const pokemonModal = useSelector(
    (state: StateType) => state.pokemonsData.modalPoke
  );
  const pokemons = useSelector((state: StateType) => state.pokemonsData.data);

  const dispatch = useAppDispatch();

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
      behavior: "smooth",
      top: 0,
    });
  };

  const handleClickPrev = () => {
    if (fetchOffset > 0) {
      setFetchOffset((prev) => prev - 20);
    }
    dispatch(loadData(fetchOffset));
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  return (
    <div className={styles.mainWrapper}>
      <img
        className={styles.pokemonLogo}
        src="http://surl.li/gmzcb"
        alt="pokemon-logo"
      />
      <div className={styles.buttonsWrapper}>
        <Button
          disabled={fetchOffset === 0}
          variant="contained"
          onClick={handleClickPrev}
        >
          <ArrowCircleLeft className={styles.ArrowCircle} />
        </Button>
        <Button
          disabled={fetchOffset >= POKEMONS_COUNT - 1}
          variant="contained"
          onClick={handleClickNext}
        >
          <ArrowCircleRight className={styles.ArrowCircle} />
        </Button>
      </div>
      <div className={styles.cardsWrapper}>
        {pokemons.map((item: PokemonPreviewItem) => (
          <Cards
            key={item.name}
            name={item.name}
            src={item.url}
            onClick={() => handleOpen(item.url)}
          />
        ))}
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          disabled={fetchOffset === 0}
          variant="contained"
          onClick={handleClickPrev}
        >
          <ArrowCircleLeft className={styles.ArrowCircle} />
        </Button>
        <Button
          disabled={fetchOffset >= POKEMONS_COUNT - 1}
          variant="contained"
          onClick={handleClickNext}
        >
          <ArrowCircleRight className={styles.ArrowCircle} />
        </Button>
      </div>
      <ModalView data={pokemonModal} func={handleClose} open={open} />
    </div>
  );
}

export default Main;

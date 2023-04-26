import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import styles from "./styles.module.scss";
import { getCardsImg } from "../../store/fetchApi";

type CardsProps = {
  name: string;
  src: string;
  onClick: () => void;
};

function Cards({ name, src, onClick }: CardsProps) {
  const [pokeImgSrc, setPokeImgSrc] = useState<string>("");

  // const pokeName = name.length > 15 ? name.slice(0, 15).toUpperCase() : name.toUpperCase();

  useEffect(() => {
    (async () => {
      const pokeImg = await getCardsImg(src);
      setPokeImgSrc(pokeImg.sprites.front_default);
    })();
  });

  return (
    <Card onClick={onClick} className={styles.cards}>
      <div className={styles.cardFirstChild}>
        <CardActionArea>
          <div className={styles.cardMedia}>
            <CardMedia component="img" alt={name} image={pokeImgSrc} />
          </div>
          <div className={styles.cardNameParrent}>
            <div className={styles.cardName}>
              {name.toUpperCase()}
            </div>
          </div>
        </CardActionArea>
      </div>
    </Card>
  );
}

export default Cards;

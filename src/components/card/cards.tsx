import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea, CircularProgress } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import styles from './styles.module.scss';
import { getCardsImg } from '../../store/fetchApi';

type CardsProps = {
  name: string;
  src: string;
  onClick: () => void;
};

function Cards({ name, src, onClick }: CardsProps) {
  const [pokeImgSrc, setPokeImgSrc] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (() => {
      setLoading(true);
      getCardsImg(src)
        .then((res) => {
          setPokeImgSrc(res.sprites.front_default);
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [src]);

  return (
    <Card onClick={onClick} className={styles.cards}>
      <div className={styles.cardFirstChild}>
        <CardActionArea>
          <div className={styles.cardMedia}>
            {loading && !pokeImgSrc ? (
              <CircularProgress />
            ) : pokeImgSrc ? (
              <CardMedia component="img" alt={name} image={pokeImgSrc} />
            ) : (
              <ImageNotSupportedIcon
                color="primary"
                sx={{ fontSize: '100px' }}
              />
            )}
          </div>
          <div className={styles.cardNameParent}>
            <div className={styles.cardName}>{name.toUpperCase()}</div>
          </div>
        </CardActionArea>
      </div>
    </Card>
  );
}

export default Cards;

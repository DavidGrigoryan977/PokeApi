import * as React from 'react';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Fade, Modal } from '@mui/material';
import { useState } from 'react';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import styles from './styles.module.scss';
import { ModalViewProps } from '../../types/types';

function ModalView({ data, handleClose, open }: ModalViewProps) {
  const [picChanger, setPicChanger] = useState<boolean>(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        handleClose(false);
        setPicChanger(false);
      }}
      slots={{ backdrop: Backdrop }}
    >
      <Fade in={open}>
        <div className={styles.modalBox}>
          <Box>
            <img
              className={styles.pokemonLogoModal}
              src="http://surl.li/gmzcb"
              alt="pokemon-logo"
            />
            <div className={styles.modalPhotoWrapper}>
              <Button onClick={() => setPicChanger((prev) => !prev)}>
                <ArrowCircleLeft className={styles.ArrowCircle} />
              </Button>
              {!picChanger ? (
                data?.sprites.front_default ? (
                  <img
                    className={styles.pokeImg}
                    src={data?.sprites.front_default}
                    alt="front-img"
                  />
                ) : (
                  <div className={styles.pokeImg}>
                    <ImageNotSupportedIcon
                      color="primary"
                      sx={{ fontSize: '100px' }}
                    />
                  </div>
                )
              ) : data?.sprites.back_default ? (
                <img
                  className={styles.pokeImg}
                  src={data?.sprites.back_default}
                  alt="back-img"
                />
              ) : (
                <div className={styles.pokeImg}>
                  <ImageNotSupportedIcon
                    color="primary"
                    sx={{ fontSize: '100px' }}
                  />
                </div>
              )}
              <Button onClick={() => setPicChanger((prev) => !prev)}>
                <ArrowCircleRight className={styles.ArrowCircle} />
              </Button>
            </div>
            <div className={styles.descriptionWrapper}>
              <div className={styles.modalName}>{data?.name.toUpperCase()}</div>
              <div className={styles.descLinesWrapper}>
                <div className={styles.descriptionLines}>
                  Type :
                  <span className={styles.descCount}>
                    {data?.types[0].type.name}
                  </span>
                </div>
                <div className={styles.descriptionLines}>
                  Weight :
                  <span className={styles.descCount}>{data?.weight}</span>
                  KG
                </div>
                <div className={styles.descriptionLines}>
                  Height :
                  <span className={styles.descCount}>{data?.height}</span>
                  0CM
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalView;

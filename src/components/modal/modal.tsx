import * as React from "react";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import { Box, Button, Fade, Modal } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";

type Type = {
  type: {
    name: string;
  };
};
export type Data = {
  types: Type[];
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  name: string;
};

type ModalViewProps = {
  data: Data;
  func: (b: boolean) => void;
  open: boolean;
};

function ModalView({ data, func, open }: ModalViewProps) {
  const [picChanger, setPicChanger] = useState<boolean>(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        func(false);
        setTimeout(() => {
          setPicChanger(false);
        }, 100);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
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
                <img
                  className={styles.pokeImg}
                  src={data ? data.sprites.front_default : ""}
                  alt="front-img"
                />
              ) : (
                <img
                  className={styles.pokeImg}
                  src={data ? data.sprites.back_default : ""}
                  alt="back-img"
                />
              )}
              <Button onClick={() => setPicChanger((prev) => !prev)}>
                <ArrowCircleRight className={styles.ArrowCircle} />
              </Button>
            </div>
            <div className={styles.descriptionWrapper}>
              <div className={styles.modalName}>
                {data ? data.name.toUpperCase() : ""}
              </div>
              <div className={styles.descLinesWrapper}>
                <div className={styles.descriptionLines}>
                  Type :
                  <span className={styles.descCount}>
                    {data ? data.types[0].type.name : ""}
                  </span>
                </div>
                <div className={styles.descriptionLines}>
                  Weight :
                  <span className={styles.descCount}>
                    {data ? data.weight : ""}
                  </span>
                  KG
                </div>
                <div className={styles.descriptionLines}>
                  Height :
                  <span className={styles.descCount}>
                    {data ? data.height : ""}0
                  </span>
                  CM
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

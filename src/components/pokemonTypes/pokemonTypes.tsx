import { useEffect } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadData, loadSpecifyData, loadTypesMenu } from '../../store/slices';
import styles from './styles.module.scss';
import { StateType, TypeMenuType } from '../../types/types';

function TypesMenu({ offset }: { offset: number }) {
  const dispatch = useDispatch<any>();
  const typesMenu = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.pokemonTypes
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(loadTypesMenu('https://pokeapi.co/api/v2/type'));
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    }
  }, [navigate, pathname]);

  useEffect(() => {
    typesMenu.map((item: { name: string; url: string }) => {
      if (item.name === pathname.slice(1)) {
        dispatch(loadSpecifyData(item.url));
      }
      if (pathname.slice(1) === 'home') {
        dispatch(loadData(offset));
      }
      return null;
    });
  }, [pathname, typesMenu]);

  const handleClick = (item: { name: string }) => {
    navigate(item.name);
  };

  return (
    <div className={styles.MenuItemsWrapper}>
      {typesMenu?.map((item: TypeMenuType) => {
        return (
          <div key={item.name} className={styles.menuItem}>
            <Chip
              label={item.name.toUpperCase()}
              onClick={() => handleClick(item)}
              className={styles.menuItem}
              color="primary"
              variant={pathname.slice(1) === item.name ? 'outlined' : 'filled'}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TypesMenu;

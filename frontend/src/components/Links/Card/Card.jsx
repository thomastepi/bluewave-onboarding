import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { HelperLinkContext } from '../../../services/linksProvider';
import styles from './Card.module.scss';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Hamburger } from '../../../assets/icons/utilityIcons';

const Card = ({ card, onDragEnd, onDragOver, onDragStart, onDrop }) => {
  const { toggleSettings, setItemToDelete, setIsPopupOpen } =
    useContext(HelperLinkContext);
  const { title } = card;

  const onDelete = (e) => {
    try {
      e.stopPropagation();
      setItemToDelete(card);
      setIsPopupOpen(true);
    } catch (error) {
      console.error('Failed to initiate delete:', error);
    }
  };

  return (
    <ListItem
      onClick={(e) => toggleSettings(e, card)}
      draggable={true}
      onDragStart={() => onDragStart(card)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={() => onDrop(card)}
      secondaryAction={
        <button className={styles.card__secondaryButton} onClick={onDelete}>
          <CloseRoundedIcon
            sx={{ color: '#747474', backgroundColor: 'transparent' }}
          />
        </button>
      }
    >
      <ListItemAvatar id={`drag-${card.id}`}>
        <div className={styles.card__grabHandle}>
          <Hamburger />
        </div>
      </ListItemAvatar>
      <ListItemText primary={title} />
    </ListItem>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    order: PropTypes.number,
  }),
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
};

export default Card;

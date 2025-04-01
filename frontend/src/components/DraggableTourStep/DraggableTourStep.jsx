import PropTypes from 'prop-types';
import styles from './DraggableTourStep.module.scss';
import { Hamburger, TrashIcon } from '../../assets/icons/utilityIcons';
import { ListItem, ListItemAvatar } from '@mui/material';

const DraggableTourStep = ({
  id,
  text,
  isActive,
  stepsLength,
  stepNameChangeHandler,
  onSelectHandler,
  onDeleteHandler,
  onDragEnd,
  onDragOver,
  onDragStart,
  onDrop,
}) => {
  return (
    <ListItem
      className={`${styles.stepContainer} ${
        isActive ? styles.stepContainer__isActive : ''
      }`}
      disablePadding
      onClick={onSelectHandler}
      draggable={true}
      onDragStart={() => onDragStart(id)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={() => onDrop(id)}
      sx={{
        '& .MuiListItemSecondaryAction-root': {
          right: '8px',
        },
      }}
      secondaryAction={
        <button
          className={styles.stepContainer__button}
          disabled={stepsLength === 1}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteHandler();
          }}
        >
          <TrashIcon stroke="var(--second-text-color)" />
        </button>
      }
    >
      <ListItemAvatar sx={{ minWidth: 'auto' }}>
        <div className={styles.stepContainer__grabHandle}>
          <Hamburger />
        </div>
      </ListItemAvatar>

      <div style={{ flexGrow: 1, paddingLeft: '1rem' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => stepNameChangeHandler?.(e.target.value)}
          className={`${styles.stepContainer__customInput}`}
        />
      </div>
    </ListItem>
  );
};

DraggableTourStep.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  stepsLength: PropTypes.number,
  stepNameChangeHandler: PropTypes.func.isRequired,
  onSelectHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
};

export default DraggableTourStep;

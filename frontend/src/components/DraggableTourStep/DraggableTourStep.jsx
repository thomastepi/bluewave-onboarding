import PropTypes from 'prop-types';
import styles from './DraggableTourStep.module.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Hamburger, TrashIcon } from '../../assets/icons/utilityIcons';

const DraggableTourStep = ({
  id,
  text,
  isActive,
  stepsLength,
  stepNameChangeHandler,
  onSelectHandler,
  onDeleteHandler,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.stepContainer} ${
        isActive ? styles.stepContainer__isActive : ''
      }`}
      onClick={onSelectHandler}
    >
      <div
        {...attributes}
        {...listeners}
        className={styles.stepContainer__grabHandle}
      >
        <Hamburger />
      </div>

      <div style={{ flexGrow: 1, paddingLeft: '1rem' }}>
        <input
          type="text"
          value={text}
          onChange={stepNameChangeHandler}
          className={`${styles.stepContainer__customInput}`}
        />
      </div>

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
    </div>
  );
};

DraggableTourStep.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  stepsLength: PropTypes.number,
  stepNameChangeHandler: PropTypes.func,
  onSelectHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
};

export default DraggableTourStep;

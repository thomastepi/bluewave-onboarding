import PropTypes from 'prop-types';
import styles from './DraggableTourStep.module.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Hamburger, TrashIcon } from '../../assets/icons/utilityIcons';

const DraggableTourStep = ({
  id,
  text,
  isActive,
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
        style={{ cursor: 'grab', width: '10px', height: '14px' }}
      >
        <Hamburger />
      </div>

      <h3
        style={{
          flexGrow: 1,
          paddingLeft: '1rem',
          border: '1px',
          cursor: 'pointer',
        }}
      >
        {text || 'Step'}
      </h3>

      <button
        className={styles.stepContainer__button}
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
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onSelectHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
};

export default DraggableTourStep;

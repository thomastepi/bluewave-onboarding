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
        style={{ cursor: 'grab', width: '10px', height: '14px' }}
      >
        <Hamburger />
      </div>

      <div style={{ flexGrow: 1, paddingLeft: '1rem' }}>
        <input
          type="text"
          value={text}
          onChange={stepNameChangeHandler}
          style={{
            padding: '3px 0.5rem',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--main-text-color)',
            cursor: 'text',
            outline: 'none',
            width: '100px',
            border: '1px solid transparent',
            backgroundColor: 'var(--header-background)',
          }}
          onFocus={(e) => {
            e.target.style.border = '1px solid var(--light-border-color)';
            e.target.style.backgroundColor = 'white';
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid transparent';
            e.target.style.backgroundColor = 'var(--header-background)';
          }}
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
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onSelectHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func,
};

export default DraggableTourStep;

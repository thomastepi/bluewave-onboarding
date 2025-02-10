import PropTypes from 'prop-types';
import styles from './DraggableTourStep.module.scss';
import { Hamburger, TrashIcon } from '../../assets/icons/utilityIcons';

const DraggableTourStep = ({ text }) => (
  <div className={styles.stepContainer}>
    <Hamburger />
    <h3 style={{ flexGrow: 1, paddingLeft: '1rem', border: '1px' }}>{text || 'Step'}</h3>
    <TrashIcon stroke="var(--second-text-color)" />
  </div>
);

DraggableTourStep.proptype = {
  text: PropTypes.string,
};

export default DraggableTourStep;

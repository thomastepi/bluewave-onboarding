import styles from './TourLeftContent.module.scss';
import DraggableTourStep from '../../../components/DraggableTourStep/DraggableTourStep';
import Button from '../../../components/Button/Button';

const TourLeftContent = () => {
  return (
    <div className={styles.container}>
      <h2 style={{ marginTop: '1.5rem', marginBottom: '10px' }}>
        Tour steps (popups)
      </h2>

      <div className={styles.stepsList}>
        <DraggableTourStep text={'Step 1'} />
        <DraggableTourStep text={'Step 1'} />
        <DraggableTourStep text={'Step 1'} />
        <DraggableTourStep text={'Step 1'} />
        <DraggableTourStep text={'Step 1'} />
      </div>

      <Button style={{borderRadius: '8px', marginTop: '1.5rem', width: '100%'}} text='Add a new step'/>
    </div>
  );
};

export default TourLeftContent;

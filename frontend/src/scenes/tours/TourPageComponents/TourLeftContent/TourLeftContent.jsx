import { useState } from 'react';
import styles from './TourLeftContent.module.scss';
import DraggableTourStep from '../../../../components/DraggableTourStep/DraggableTourStep';
import Button from '../../../../components/Button/Button';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import PropTypes from 'prop-types';
import CustomTextField from '../../../../components/TextFieldComponents/CustomTextField/CustomTextField';

const TourLeftContent = ({
  stepsData,
  setStepsData,
  setTourDetails,
  currentStep,
  setCurrentStep,
}) => {
  const [activeDragId, setActiveDragId] = useState(null); // Track the currently dragged item

  const defaultStep = {
    stepName: 'Step',
    header: 'Welcome to GuideFox',
    content:
      'Serve your users and increase product adoption with hints, popups, banners, and helper links. \n\nEarn an extra 30% if you purchase an annual plan with us.',
    targetElement: '',
  };

  // Sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewStepHandler = () => {
    setStepsData((prev) => [
      ...prev,
      {
        ...defaultStep,
        id: Date.now(),
        stepName: `Step ${prev.length + 1}`,
      },
    ]);
  };

  const renameStepHandler = (newName) => {
    setTourDetails('stepName', newName);
  };

  const selectHandler = (identity) => {
    const step = stepsData.find((step) => step.id === identity);
    if (!step) {
      console.error('Step not found');
      return;
    }
    setCurrentStep(step);
  };

  const deleteHandler = (identity) => {
    if (stepsData.length === 1) return;

    const updatedSteps = stepsData.filter(({ id }) => id !== identity);

    if (identity === currentStep.id) {
      setCurrentStep(updatedSteps[0]);
    }

    setStepsData(updatedSteps);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setStepsData((stepsData) => {
      const oldIndex = stepsData.findIndex((step) => step.id === active.id);
      const newIndex = stepsData.findIndex((step) => step.id === over.id);
      return arrayMove(stepsData, oldIndex, newIndex);
    });
    setActiveDragId(null);
  };

  return (
    <div className={styles.container}>
      <CustomTextField
        value={currentStep.targetElement}
        onChange={(e) => setTourDetails('targetElement', e?.target.value)}
        labelSubText="Target element for each step"
        labelTextStyles={{ color: 'var(--main-text-color)' }}
        TextFieldWidth="267px"
        placeholder=".element"
        style={{ marginTop: '1.2rem' }}
      />

      <h2 style={{ marginBottom: '10px' }}>Tour steps (popups)</h2>

      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => setActiveDragId(active.id)}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={stepsData}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.stepsList}>
            {stepsData.map(({ id, stepName }) => (
              <DraggableTourStep
                key={id}
                id={id}
                text={stepName}
                isActive={currentStep.id === id}
                stepsLength={stepsData.length}
                stepNameChangeHandler={(e) => renameStepHandler(e.target.value)}
                onSelectHandler={() => selectHandler(id)}
                onDeleteHandler={() => deleteHandler(id)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeDragId ? (
            <DraggableTourStep
              id={activeDragId}
              text={
                stepsData.find((step) => step.id === activeDragId)?.stepName
              }
              isActive={currentStep.id === activeDragId}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <Button
        onClick={addNewStepHandler}
        style={{ borderRadius: '8px', marginTop: '1.5rem', width: '100%' }}
        text="Add a new step"
      />
    </div>
  );
};

TourLeftContent.propTypes = {
  stepsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      stepName: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      targetElement: PropTypes.string.isRequired,
    })
  ).isRequired,
  setStepsData: PropTypes.func.isRequired,
  setTourDetails: PropTypes.func.isRequired,
  currentStep: PropTypes.object,
  setCurrentStep: PropTypes.func.isRequired,
};

export default TourLeftContent;

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

const TourLeftContent = ({
  stepsData,
  setStepsData,
  setTourDetails,
  setCurrentStep,
}) => {
  const [activeStepId, setActiveStep] = useState(0);
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
    setActiveStep(identity);
    setCurrentStep(step);
  };

  const deleteHandler = (identity) => {
    const updatedSteps = stepsData.filter(({ id }) => id !== identity);

    if (updatedSteps.length === 0) {
      console.error('No steps remaining');
      return;
    }

    if (identity === activeStepId) {
      setActiveStep(updatedSteps[0].id);
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
      <h2 style={{ marginTop: '1.5rem', marginBottom: '10px' }}>
        Tour steps (popups)
      </h2>

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
                isActive={activeStepId === id}
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
              isActive={activeStepId === activeDragId}
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
  setCurrentStep: PropTypes.func.isRequired,
};

export default TourLeftContent;

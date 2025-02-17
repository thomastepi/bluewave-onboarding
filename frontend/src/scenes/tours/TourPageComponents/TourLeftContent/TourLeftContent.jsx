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

const TourLeftContent = ({ stepsData, setStepsData, setCurrentStep }) => {
  const [activeStep, setActiveStep] = useState(0);
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

  const selectHandler = (identity) => {
    setActiveStep(identity);
    setCurrentStep(stepsData.find((step) => step.id === identity));
  };

  const deleteHandler = (identity) => {
    const updatedSteps = stepsData.filter(({ id }) => id !== identity);

    if (identity === activeStep) {
      updatedSteps.length > 0
        ? setActiveStep(updatedSteps[0].id)
        : setActiveStep(-1);
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
        Tour stepsData (popups)
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
                isActive={activeStep === id}
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
              isActive={activeStep === activeDragId}
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
  stepsData: PropTypes.array.isRequired,
  setStepsData: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default TourLeftContent;

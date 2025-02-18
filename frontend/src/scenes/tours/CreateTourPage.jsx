import { React, useEffect, useState } from 'react';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import TourPreview from './TourPreview/TourPreview';
import TourLeftContent from './TourPageComponents/TourLeftContent/TourLeftContent';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import TourLeftAppearance from './TourPageComponents/TourleftAppearance/TourLeftAppearance';
import CustomTextField from '../../components/TextFieldComponents/CustomTextField/CustomTextField';

const TourPage = ({
  autoOpen = false,
  isEdit,
  itemId,
  setItemsUpdated,
  setIsEdit,
}) => {
  const [activeButton, setActiveButton] = useState(0);
  const [stepsData, setStepsData] = useState([
    {
      id: 0,
      stepName: 'Step 1',
      header: 'Welcome to GuideFox',
      content:
        'Serve your users and increase product adoption with hints, popups, banners, and helper links. \n\nEarn an extra 30% if you purchase an annual plan with us.',
      targetElement: '',
    },
  ]);
  const [currentStep, setCurrentStep] = useState(stepsData[0]);

  const [appearance, setAppearance] = useState({
    headerColor: '#101828',
    textColor: '#344054',
    buttonBackgroundColor: '#7F56D9',
    buttonTextColor: '#FFFFFF',
    tourSize: 'Small',
    finalButtonText: 'Complete tour',
    url: 'https://',
    isActive: true,
  });

  useEffect(() => {
    const updatedCurrentStep = stepsData.find(
      (step) => step.id === currentStep.id
    );

    //Syncing currentStep with the updated step for display purpose in preview.
    if (updatedCurrentStep) {
      setCurrentStep(updatedCurrentStep);
    }
  }, [stepsData, currentStep]);

  const fields = [
    { name: 'headerColor', label: 'Header Color' },
    { name: 'textColor', label: 'Text Color' },
    {
      name: 'buttonBackgroundColor',
      label: 'Button Background Color',
    },
    {
      name: 'buttonTextColor',
      label: 'Button Text Color',
    },
  ];

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const setTourDetails = (property, data) => {
    const updatedSteps = stepsData.map((step) =>
      step.id === currentStep.id ? { ...step, [property]: data } : step
    );

    setStepsData(updatedSteps);
  };

  const onSave = () => {
    const finalSteps = stepsData.map((data, index) => ({
      ...data,
      order: index,
    }));
    console.log(finalSteps, appearance);
  };

  const previewComponent = () => <TourPreview tourAppearance={appearance} />;

  const rightContent = () =>
    activeButton === 1 ? (
      previewComponent()
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <RichTextEditor
          previewComponent={previewComponent}
          header={currentStep.header}
          setHeader={(data) => setTourDetails('header', data)}
          setContent={(data) => setTourDetails('content', data)}
          content={currentStep.content}
          sx={{
            position: 'relative',
            minWidth: '400px',
            maxWidth: '700px',
            marginLeft: '2.5rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        />

        <div style={{ alignSelf: 'end' }}>
          <CustomTextField
            value={currentStep.targetElement}
            onChange={(e) => setTourDetails('targetElement', e?.target.value)}
            labelSubText="Target Element"
            TextFieldWidth="200px"
            placeholder=".element"
          ></CustomTextField>
        </div>
      </div>
    );

  return (
    <GuideTemplate
      title={isEdit ? 'Edit Tour' : 'New Tour'}
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      setIsEdit={setIsEdit}
      headerButtons={['Content', 'Appearance & target URL']}
      enableActiveButton={true}
      onSwitchChange={(e) =>
        setAppearance((prev) => ({ ...prev, isActive: e.target.checked }))
      }
      switchValue={appearance.isActive}
      rightContent={rightContent}
      leftContent={() => (
        <TourLeftContent
          stepsData={stepsData}
          setStepsData={setStepsData}
          setCurrentStep={setCurrentStep}
        />
      )}
      leftAppearance={() => (
        <TourLeftAppearance
          data={fields}
          tourPopupAppearance={appearance}
          setTourPopupAppearance={setAppearance}
          onSave={onSave}
        />
      )}
    />
  );
};

export default TourPage;

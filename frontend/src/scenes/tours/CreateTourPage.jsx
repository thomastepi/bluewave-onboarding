import { React, useEffect, useState } from 'react';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import TourPreview from './TourPreview/TourPreview';
import TourLeftContent from './TourLeftContent/TourLeftContent';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import TourLeftApperance from './TourPageComponents/TourleftApperance/TourLeftApperance';

const TourPage = ({
  autoOpen = false,
  isEdit,
  itemId,
  setItemsUpdated,
  setIsEdit,
}) => {
  const [activeButton, setActiveButton] = useState(0);

  const [appearance, setAppearance] = useState({
    headerColor: '#101828',
    textColor: '#344054',
    buttonBackgroundColor: '#7F56D9',
    buttonTextColor: '#FFFFFF',
    tourSize: 'Small',
    finalButtonText: 'Complete tour',
    url: 'https://',
  });

  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');

  const [stepsData, setStepsData] = useState([
    {
      stepText: 'Step 1',
      header: '',
      content: '',
    },
  ]);

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

  const onSave = () => {};

  const rightContent = () =>
    activeButton === 1 ? (
      <TourPreview tourAppearance={appearance} />
    ) : (
      <RichTextEditor
        previewComponent={TourPreview}
        header={header}
        setHeader={setHeader}
        setContent={setContent}
        content={content}
        sx={{
          position: 'relative',
          minWidth: '400px',
          maxWidth: '700px',
          marginLeft: '2.5rem',
          marginTop: '1rem',
        }}
      />
    );

  return (
    <GuideTemplate
      title={isEdit ? 'Edit Tour' : 'New Tour'}
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      setIsEdit={setIsEdit}
      headerButtons={['Content', 'Apperance & target URL']}
      rightContent={rightContent}
      leftContent={() => <TourLeftContent />}
      leftAppearance={() => (
        <TourLeftApperance
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

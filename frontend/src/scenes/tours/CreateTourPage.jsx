import { React, useEffect, useState } from 'react';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';

const TourPage = ({
  autoOpen = false,
  isEdit,
  itemId,
  setItemsUpdated,
  setIsEdit,
}) => {
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const onSave = () => {

  }
  
  return (
    <GuideTemplate
      title={isEdit ? 'Edit Tour' : 'New Tour'}
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      setIsEdit={setIsEdit}
    />
  );
};

export default TourPage;

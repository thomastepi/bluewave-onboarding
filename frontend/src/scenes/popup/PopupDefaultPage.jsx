import React, { useState } from "react";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import { deletePopup, getPopups } from "../../services/popupServices";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";
import CreatePopupPage from "./CreatePopupPage";

const PopupDefaultPage = () => {
  const [itemsUpdated, setItemsUpdated] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState(null);

  const { isOpen } = useDialog();

  const getPopupDetails = (popup) => ({
    title: `Popup ${popup.id}`,
    text: popup.header,
  });

  return (
    <>
      <DefaultPageTemplate
        getItems={getPopups}
        deleteItem={deletePopup}
        setIsEdit={setIsEdit}
        setItemId={setItemId}
        itemType={ACTIVITY_TYPES_INFO.POPUPS}
        itemTypeInfo={ACTIVITY_TYPES_INFO.POPUPS}
        getItemDetails={getPopupDetails}
        itemsUpdated={itemsUpdated}
      />
      {isOpen && (
        <CreatePopupPage
          isEdit={isEdit}
          itemId={itemId}
          setItemsUpdated={setItemsUpdated}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};

export default PopupDefaultPage;

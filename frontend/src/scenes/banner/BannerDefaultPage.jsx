import React, { useState } from "react";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import { deleteBanner, getBanners } from "../../services/bannerServices";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";
import BannerPage from "./CreateBannerPage";

const BannerDefaultPage = () => {
  const [itemsUpdated, setItemsUpdated] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState(null);

  const { isOpen } = useDialog();

  const getBannerDetails = (banner) => ({
    title: `Banner ${banner.id}`,
    text: banner.bannerText,
  });

  return (
    <>
      <DefaultPageTemplate
        getItems={getBanners}
        deleteItem={deleteBanner}
        setIsEdit={setIsEdit}
        setItemId={setItemId}
        itemType={ACTIVITY_TYPES_INFO.BANNERS}
        itemTypeInfo={ACTIVITY_TYPES_INFO.BANNERS}
        getItemDetails={getBannerDetails}
        itemsUpdated={itemsUpdated}
      />
      {isOpen && (
        <BannerPage
          isEdit={isEdit}
          itemId={itemId}
          setItemsUpdated={setItemsUpdated}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};

export default BannerDefaultPage;

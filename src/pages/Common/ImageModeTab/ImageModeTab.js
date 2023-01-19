import classes from "./ImageModeTab.module.css";
import React, { useState, useEffect,useMemo } from "react";
import ImageTab from "./Sections/ImageTab/ImageTab";
import TextTab from "./Sections/TextTab/TextTab";
import clsx from "clsx";

const ImageModeTab = ({ sentence, onChange, mode = "", imageStatus,imageOption }) => {
  const activatedTabIndex = useMemo(() => {
    if(imageOption === 'Yes'){
      return 1
    }else{
      return 2
    }
  }
  
  , [imageOption]);
  const [activatedTab, setActivedTab] = useState(activatedTabIndex);

  const onTabChange = (e) => {
    setActivedTab(e);
  };

  return (
    <>
      <div className={classes.main}>
        {mode !== "title" && (
          <div className={classes.pageNumber}>
            <p>Page {sentence.id}</p>
          </div>
        )}
        <div className={classes.tabs}>
          <div className={classes.tabFlex}>
            <div
              onClick={() => onTabChange(1)}
              className={clsx(
                classes.tab1,
                activatedTab === 1 && classes.tabActivated
              )}
            >
              <p>Image mode</p>
            </div>
            <div
              onClick={() => onTabChange(2)}
              className={clsx(
                classes.tab2,
                activatedTab === 2 && classes.tabActivated
              )}
            >
              <p>Text only</p>
            </div>
          </div>
        </div>
        <div className={classes.pages}>
          {activatedTab === 1 ? (
            <div className={classes.imageTabContent}>
              <ImageTab
                sentence={sentence}
                imageStatus={imageStatus}
                onChange={onChange}
                mode={mode}
              />
            </div>
          ) : (
            <div>
              <TextTab sentence={sentence} onChange={onChange} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ImageModeTab;

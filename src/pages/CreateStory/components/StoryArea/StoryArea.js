import classes from "./StoryArea.module.css";
import React, { useState, useEffect } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import FontDropdown from "../../../Common/FontDropdown/FontDropdown";
const StoryArea = ({
  storyText,
  setStoryText,
  fontSize,
  setFontSize,
  onRefresh,
}) => {
  const handleChange = (e) => {
    setStoryText(e.target.value);
  };
  return (
    <>
      <div className={classes.main}>
        <div className={classes.storyText}>
          <div className={classes.header}>
            <div className={classes.leftFlex}>
              <div className={classes.item1}>
                <p>Story Text</p>
              </div>
              <div className={classes.item2}>
                <p>{storyText.length} words</p>
              </div>
            </div>
            <div className={classes.rightFlex}>
              <div className={classes.item3}>
                <FontDropdown fontSize={fontSize} setFontSize={setFontSize} />
              </div>
              <div className={classes.item4}>
                <SyncIcon onClick={onRefresh} />
              </div>
            </div>
          </div>
          <div className={classes.storyArea}>
            <textarea
            // style={{fontSize:fontSize + 'px',lineHeight:fontSize + 'px'}}
              name="story"
              className={classes.textStoryArea}
              rows={4}
              cols={40}
              onChange={handleChange}
              value={storyText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default StoryArea;

import classes from "./TitleArea.module.css";
import React, { useState, useEffect } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import FontDropdown from "../../../Common/FontDropdown/FontDropdown";

const TitleArea = ({ titleText, setTitleText, titleFontSize, setTitleFontSize }) => {
  const handleChange = (e) => {
    setTitleText(e.target.value);
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.storyTitle}>
          <div className={classes.header}>
            <div className={classes.item1}>
              <p>Title</p>
            </div>
            <div className={classes.item3}>
              <FontDropdown fontSize={titleFontSize} setFontSize={setTitleFontSize} />
            </div>
          </div>
          <div className={classes.titleArea}>
            <textarea
              name="title"
              //style={{fontSize:titleFontSize + 'px',lineHeight:titleFontSize + 'px'}}
              className={classes.titleStoryArea}
              rows={4}
              cols={40}
              value={titleText}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default TitleArea;

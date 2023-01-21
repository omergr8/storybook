import classes from "./StoryRead.module.css";
import clsx from "clsx";
import { defaultBG } from "../../../Constants/sets";
import React, { useState, useEffect } from "react";
import { textModifier } from "../../../../utility/functions";
const HighlightedText = ({ text, story, word, timeStampCurrent,running }) => {
    const mod = textModifier(story, timeStampCurrent, word, text);
    if(running){
      return (
        <p className={classes.englishSentence}>
          {mod.before}
          <span style={{ color: "#F663E8" }}>{mod.highlight}</span>
          {mod.after}
        </p>
      );
    }else{
      return (
        <p className={classes.englishSentence}>
          {mod.highlight} {mod.before}
          {/* <span style={{ color: "#F663E8" }}>{mod.highlight}</span> */}
          {mod.after}
        </p>
      );
    }
   
  };
const StoryRead = ({ data,  highlightSection,running }) => {
  return (
    <>
      <div className={classes.main}>
        <div className="">
          {data.backgroundImage && (
            <div className={classes.image}>
              <img src={data.backgroundImage} height="500px" width="100%" />
            </div>
          )}
          <div
            className={clsx(
              classes.title,
              (data.backgroundCover || (!data.backgroundCover && !data.backgroundImage) ) && classes.back,
            )}
            style={{
              backgroundImage: data.backgroundCover
                ? `url(${data.backgroundCover})`
                : (!data.backgroundCover && !data.backgroundImage) ? `url(${defaultBG})` : '' ,
            }}
          >
            {/* <p>{data.value}</p> */}
            <div className="container-80">
                   <HighlightedText
            text={data?.value}
            story={data?.speechParams}
            running={running}
            {...highlightSection} />
            </div>
       
          </div>
        </div>
      </div>
    </>
  );
};
export default StoryRead;

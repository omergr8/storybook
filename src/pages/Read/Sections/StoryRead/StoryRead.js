import classes from "./StoryRead.module.css";
import clsx from "clsx";
import { defaultBG } from "../../../Constants/sets";
import React from "react";
import { textModifier } from "../../../../utility/functions";


const HighlightedText = ({
  text,
  story,
  newWord,
  timeStampCurrent,
  running,
}) => {
  
  const mod = textModifier(story, timeStampCurrent, newWord, text);
  console.log("hello",timeStampCurrent,mod,'lol',newWord,text);
  if (running) {
    return (
      <p className={classes.englishSentence}>
        {mod.before}
        <span style={{ color: "#F663E8" }}>{mod.highlight}</span>
        {mod.after}
      </p>
    );
  } else {
    return (
      <p className={classes.englishSentence}>
        {
          mod.before.length === 0 ? mod.highlight +  mod.before+
          mod.after :  mod.before+
          mod.after + mod.highlight }
        
      </p>
    );
  }
};


const StoryRead = ({ data, highlightSection, running, word }) => {
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
              (data.backgroundCover ||
                (!data.backgroundCover && !data.backgroundImage)) &&
                classes.back
            )}
            style={{
              backgroundImage: data.backgroundCover
                ? `url(${data.backgroundCover})`
                : !data.backgroundCover && !data.backgroundImage
                ? `url(${defaultBG})`
                : "",fontSize:data.fontSize ? data.fontSize+'px' : '40px',lineHeight:data.fontSize ? data.fontSize+'px' : '50px'
            }}
          >
            <div className="container-80">
              <HighlightedText
            text={data?.value}
            newWord={word}
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

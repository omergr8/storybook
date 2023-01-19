import classes from "./CreateStory.module.css";
import OutsideClickHandler from "react-outside-click-handler";
import React, { useState, useEffect } from "react";


const CreateStory = ({ textValue, setTextValue }) => {
  const [textAreaStatus, setTextAreaStatus] = useState(false);
  const onHandleText = (e) => {
    const val = e.target.value;
    setTextValue(val);
  };

  const handleOutsideClick = () => {
    // textValue !== "" && appendSentence(textValue);
  };
  return (
    <>
      <div className={classes.main}>
   
        <div className={classes.recordArea}>
        {textValue === "" && (
          <div className={classes.textAreaAbs}>
            <p>starting typing here</p>
          </div>
        )}
          <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <textarea
              className={classes.textArea}
              onClick={() => setTextAreaStatus(false)}
              readOnly={textAreaStatus}
              onChange={onHandleText}
              value={textValue}
              placeholder="Type or speak the first 1-2 sentences of your story. ie., George the monkey had a problem.  He didn’t know where to find more bananas."
            ></textarea>
          </OutsideClickHandler>
        </div>
   
      </div>
    </>
  );
};
export default CreateStory;

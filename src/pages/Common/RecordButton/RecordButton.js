import classes from "./RecordButton.module.css";
import React, { useState, useEffect } from "react";
import MicNoneIcon from "@mui/icons-material/MicNone";

function useOutsideAlerter(ref, onEnd) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // console.log("ref is",ref.current,event,event.target,!ref.current.contains(event.target),ref.current === event.target)
      if (ref.current && !ref.current.contains(event.target)) {
        onEnd()
      }
    }
    // Bind the event listener
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [ref]);
}

const RecordButton = ({ recordingStatus,onStart,onEnd }) => {
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef,onEnd);

  const onLongPressStart = (e) => {
    if((e.button === 0 && onEnd)||(e.type === "touchend" && onStart)){
      onStart()
     }
  };
  //useOutsideAlerter(wrapperRef,onEnd);
  const onLongPressStop = (e) => {
    console.log("i am kdos")
    if((e.button === 0 && onEnd)||(e.type === "touchend" && onStart)){
      onEnd()
     }
  };
  return (
    <>
      <div className={classes.main}>
        <button
          ref={wrapperRef}
          onMouseDown={onLongPressStart}
          onMouseUp={onLongPressStop}
          onTouchStart={onLongPressStart}
          onTouchEnd={onLongPressStop}
          onKeyDown = {onLongPressStop}
          onContextMenu={onLongPressStop}
          className={classes.rbMic}
        >
          <MicNoneIcon />
        </button>
        {recordingStatus && (
          <div className={classes.recordText}>
            <p>listening...</p>
          </div>
        )}
      </div>
    </>
  );
};
export default RecordButton;

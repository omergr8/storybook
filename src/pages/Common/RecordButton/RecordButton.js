import classes from "./RecordButton.module.css";
import React, { useState, useEffect } from "react";
import MicNoneIcon from "@mui/icons-material/MicNone";
import clsx from "clsx";

function useOutsideAlerter(ref, setIsOn) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // console.log("ref is",ref.current,event,event.target,!ref.current.contains(event.target),ref.current === event.target)
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOn(false);
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
  let [isOn, setIsOn] = useState(false);
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef,setIsOn);


  const handleChange = () => {
     setIsOn(!isOn);
  };

  useEffect(()=>{
    if(isOn){
      onStart()
    }else{
      onEnd()
    }
  },[isOn])
  return (
    <>
      <div className={classes.main}>
        <button
          ref={wrapperRef}
          // onMouseDown={onLongPressStart}
          // onMouseUp={onLongPressStop}
          // onTouchStart={onLongPressStart}
          // onTouchEnd={onLongPressStop}
          // onKeyDown = {onLongPressStop}
          // onContextMenu={onLongPressStop}
          onClick={handleChange}
          className={clsx(classes.rbMic,recordingStatus && classes.rbMicActive)}
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

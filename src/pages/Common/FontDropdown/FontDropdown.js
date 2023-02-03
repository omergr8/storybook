import classes from "./FontDropdown.module.css";
import React, { useState, useEffect } from "react";

const FontDropdown = ({ fontSize, setFontSize }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    if(fontSize === ''){
        setFontSize(1)
    }
    setOpen(!open);
  };
  const onDone = () =>{
    if(fontSize === ''){
        setFontSize(1)
    }
    setOpen(false)
  }

  const handleChange = (e) =>{
    if (!e.target.validity.patternMismatch) {
        setFontSize(e.target.value);
      }
  }
  return (
    <>
      <div className={classes.main}>
        <div className={classes.chip} onClick={onClick}>
          <div className="container-90">
            <p>Font size: {fontSize}</p>
          </div>
        </div>
        {open && (
          <div className={classes.dropModel}>
            <div className="container-80">
              <div className={classes.inputBox}>
                <input className={classes.input} value={fontSize} onChange={handleChange} pattern="^-?[0-9]\d*\.?\d*$" />
              </div>
              <div className={classes.buttonDiv}>
                <button
                  className={classes.button}
                  onClick={onDone}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default FontDropdown;

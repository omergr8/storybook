import classes from "./ControlButton.module.css";
import React, { useState, useEffect } from "react";

const ControlButton = ({ direction, onNext, icon, text, isActive }) => {
  return (
    <>
      <div className={classes.main}>
        <button
          disabled={isActive}
          className={classes.controlButton}
          onClick={onNext}
        >
          {icon}
        </button>
        {!isActive && (
          <div className={classes.buttonLabel}>
            <p>{text}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default ControlButton;

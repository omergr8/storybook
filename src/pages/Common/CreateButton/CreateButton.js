import classes from "./CreateButton.module.css";
import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';

const CreateButton = ({ text }) => {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.box}>
          <div className="container-90">
            <div className={classes.flex}>
              <div className={classes.icon}>
                <AddIcon sx={{ fontSize: 40 }}/>
              </div>
              <div className={classes.text}>
                <p>{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateButton;

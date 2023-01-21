import classes from "./Congrats.module.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const Congrats = ({ selectedTitle }) => {
  console.log("sele", selectedTitle);
  return (
    <>
      <div className={classes.main}>
        <div className={classes.title}>
          <p>Congrats!</p>
          <br />
          <p>
            {selectedTitle.value.split(".").join("")} is now available to be
            read and shared. Share your story with others using this link:
          </p>
          <br />
          <a href="">http://dallas.dev/story/31341124</a>
        </div>
        <div className={classes.readNow}>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <button className={classes.readButton}>Read Story Now</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Congrats;

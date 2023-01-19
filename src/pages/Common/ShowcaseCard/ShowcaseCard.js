import classes from "./ShowcaseCard.module.css";
import React, { useState, useEffect } from "react";

const ShowcaseCard = ({image,title,rating,star}) => {
  return (
    <>
      <div className={classes.card}>
        <div className={classes.main}>
          <div className="container-80">
            <div className={classes.flex}>
              <div className={classes.image}>
                <img src={image} height='150px' width="225px" />
              </div>
              <div className={classes.title}>
                <h2>{title}</h2>
              </div>
              <div className={classes.rating}>
                <p>{rating} ratings, {star} stars</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShowcaseCard;

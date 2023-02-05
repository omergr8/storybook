import classes from "./Title.module.css";
import clsx from "clsx";
import React from "react";
import { defaultBG } from "../../../Constants/sets";

const Title = ({ data }) => {

  return (
    <>
      <div className={classes.main}>
        <div className="">
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
            <p>{data.value}</p>
          </div>
          {data.backgroundImage && (
            <div className={classes.image}>
              <img src={data.backgroundImage} height="500px" width="100%" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Title;

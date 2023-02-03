import classes from "./PageCard.module.css";
import React, { useState, useEffect } from "react";
const ph = 'https://s3-alpha-sig.figma.com/img/637d/0bd5/67655cf51c87a06493102e80feb38eeb?Expires=1676246400&Signature=Vk2KDUVw8FrKpuKl~GSJipkXjsfBVmGhh-gm1ZYVA~e~Hn0brI-M6m0REWjYrzBQVov-~rkAXw7FPmokGrJqGYC5HP9NoPXzU1YMELZiYWA3EfjM9s0CgmpeMO2xKQEO7GsaYazSQ9yZLfLp1Oaq5NXoqW-X21-njT97zlXLaLgPwYfQD2ADAyT3lPYu0ln~ZgeYbY0G4NCa9UEVvqA4ddvNp74RkqraduT8vrfRExb2Vtx4Ikm-~LQjQpepx4yhmeK~MnOqt6NYU4Td~xxZHJKYqJyfeFL9Y7rnQnBHAxMMMZ9WkfCtK4mzDHXzQT~Vu3J9-l0629KTi~pwcgZfMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
const PageCard = ({ type, page, text, image,fontSize }) => {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.header}>
            <p>{page}</p>
        </div>
        <div className={type === 'title' ? classes.card2 : classes.card}>
          <div className={classes.imageDiv}>
            <img src={image ? image : ph} width="100%" height={250} />
          </div>
          <div className={classes.contentDiv} style={{fontSize: fontSize + 'px',lineHeight: fontSize + 'px'}}>
            <div className="container-90" >
                <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PageCard;

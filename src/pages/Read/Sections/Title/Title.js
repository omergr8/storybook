import classes from "./Title.module.css";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { defaultBG } from "../../../Constants/sets";
//const bk= 'https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000&t=st=1673949909~exp=1673950509~hmac=23e533e0ae4b847c0c9d169350b4b11a34d11ed332f2f0f609440428d0a48b31'
//const bk = null
const im =
  "https://s3-alpha-sig.figma.com/img/4003/dce8/c3235cb2db6897bef0c1bac1c0193088?Expires=1675036800&Signature=e0ACxs8hjXGp2t4le4RoHcWbVQbwCQohIIHcs3SP8944G5wMZUKohTyvPsE3jlB9-84S2sstseEgeCEopj5LAKtHxL--rRvx4ozvqDcZ8ANZK670Nkfe~nt15uQO3uyWZBthHg9gZP~-IB8246tmyWizNIfqx5qvD0BNweRJwSbNcETJ~KoR79ZzxvCQgsyBlfJE5IBQrp3IfHXFdUcR1Rjt9r6wD6wj6pvNIyBGVhrgSrXzsSA7lXbDwPCPRDbzRr6lKOCC-EmfQdAJEGBA85mLO2OILtMN-aOxEj~jSWVibwDJzhgskaOwcOyBHWc7DtLbZSKiKaLy9WO8z6W4Zg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
//const im = null
const Title = ({ data }) => {
  console.log("data is", data);
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

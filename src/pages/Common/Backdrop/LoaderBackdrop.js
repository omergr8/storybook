import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function LoaderBackdrop({ data }) {
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const handleToggle = () => {
  //     setOpen(!open);
  //   };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1,flexDirection:'column' }}
        open={data.status}
        // onClick={handleClose}
      >
      <CircularProgress color="inherit" />
        <div style={{marginTop:'20px'}}>
          <p>{data.message}</p>
        </div>
      </Backdrop>
    </div>
  );
}

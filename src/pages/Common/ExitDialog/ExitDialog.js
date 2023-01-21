import * as React from 'react';
import classes from "./ExitDialog.module.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: '#D9D9D9',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height:'300px',
  borderRadius:'30px'
};

export default function ExitDialog({dialogStatus, setDialogStatus,onExit,message}) {
  
  const handleClose = () => setDialogStatus(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={dialogStatus}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p id="modal-modal-description" className={classes.text} >
          {message}
          </p>
          <div className={classes.buttonFlex}>
            <div className={classes.dontExit}>
                <button className={classes.dontExitButton} onClick={handleClose}>
                    Don't exit
                </button>
            </div>
            <div className={classes.exit}>
                <button className={classes.exitButton} onClick={onExit}>
                    Exit
                </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
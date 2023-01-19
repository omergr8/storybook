import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({errorData,setErrorData}) {
//   const [open, setOpen] = React.useState(false);
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorData(prevState => {
        return {...prevState, status:false};
      });
  };


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={errorData.status} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={errorData.severity} sx={{ width: '100%' }}>
          {errorData.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
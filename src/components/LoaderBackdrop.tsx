import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LoaderBackdropProps {
  open: boolean;
  message?: string; // optional custom message
}

const LoaderBackdrop: React.FC<LoaderBackdropProps> = ({ open, message = "Loading..." }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1, flexDirection: 'column' })}
      open={open}
    >
      <CircularProgress color="inherit" />
      <Box mt={2}>
        <Typography variant="h6" color="inherit">
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoaderBackdrop;

import React from 'react';

import { Box, Typography } from '@mui/material';

function Title() {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Punchu
      </Typography>
      <Typography variant="body1" gutterBottom>
        A fun investment to be together
      </Typography>
    </Box>
  );
}

export default Title;

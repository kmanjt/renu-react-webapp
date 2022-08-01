import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
    
    height: "160px",
    textAlign: 'center',
    margin: "auto",
  }));

function Home() {
    return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} 
  alignItems="center"
  justifyContent="center" columns={16}>
        <Grid xs={8}>
          <Item><iframe src="https://embed.lottiefiles.com/animation/84755" width={800} height={400}></iframe></Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
    </div>

    );
};

export default Home;
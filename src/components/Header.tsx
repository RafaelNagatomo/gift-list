'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import BabyIcon from '@mui/icons-material/ChildFriendly';

const Header = () => {
  return (
    <>
      <CssBaseline />
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: '#ffc5c5',
          color: '#3e2723',
          height: '200px',
          boxShadow: 'none', 
          borderBottom: '4px solid #ff9393'
        }}
      >
        <Toolbar 
          sx={{ 
            height: '100%',
            Width: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}
        >
          <BabyIcon sx={{ fontSize: 50, color: '#ff9393', mb: 2 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Sugestões para Presentes
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mt: 1, fontStyle: 'italic' }}>
            Sofia Nagatomo ❤️
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

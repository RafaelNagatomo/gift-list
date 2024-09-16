import React from 'react';
import { Container, AppBar, Typography, Box } from '@mui/material';
import { Poppins } from 'next/font/google';
import Header from '../components/Header';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: '#e2e4eb',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 0,
            }}
        >
          <AppBar position="static" sx={{ mb: 2 }}>
            <Header />
          </AppBar>
          <main style={{ flex: 1 }}>{children}</main>
        </Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
          <Typography variant="body2" component="span">
            Obrigado! E nos vemos na festa <span style={{ fontSize: 24 }}>👋</span>
          </Typography>
        </Box>
      </body>
    </html>
  );
}

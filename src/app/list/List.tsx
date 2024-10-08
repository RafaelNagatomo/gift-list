/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  AlertTitle,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CircularProgress from '@mui/material/CircularProgress';

interface Gift {
  id: number;
  name?: string;
  quantity: number;
  image?: string;
  createdAt: string;
}

const List = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [loading, setLoading] = useState<number | null>(null)

  const fetchGifts = async () => {
    try {
      const response = await axios.get('/api/gifts');
      const sortedGifts = response?.data?.sort((a: Gift, b: Gift) => (a.name ?? '').localeCompare(b.name ?? ''));
    
      setGifts(sortedGifts);
    } catch (error) {
      console.error('Falha ao buscar os presentes:', error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handleChooseGift = async (gift: Gift) => {
    setLoading(gift?.id)
    try {
      const updatedQuantity = gift?.quantity - 1;

      await axios.put(`/api/gifts/${gift?.id}`, { quantity: updatedQuantity });

      setGifts(prevGifts =>
        prevGifts.map(g => (g.id === gift?.id ? { ...g, quantity: updatedQuantity } : g))
      );

      setShowThankYouModal(true);
      setLoading(null)
      setTimeout(() => {
        setShowThankYouModal(false);
      }, 5000);
    } catch (error) {
      console.error('Falha ao atualizar o presente:', error);
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '5px',
          borderRadius: '12px',
          borderColor: 'gray.00',
          margin: '15px',
          backgroundColor: '#fff4e5',
        }}
      >
        <WarningAmberIcon sx={{ color: '#ff9800', fontSize: 40, ml: '5px' }} />
        
        <Typography variant="h6" sx={{ m: 3 }}>
          <AlertTitle>
            Por favor, sinta-se à vontade para escolher a marca e a quantidade de fraldas por pacote que preferir. E também, a loja de sua preferência.
          </AlertTitle>
        </Typography>
      </Card>

      <Typography variant="h6" sx={{ m: 3 }}>
        Esta lista não é um site de vendas, é apenas para controle de quantidade dos pais.
      </Typography>
        
      <Grid container>
      {gifts?.map((gift) => (
        <Grid container item xs={12} sm={6} md={6} key={gift?.id}>
          <Card 
            key={gift?.id} 
            variant="outlined" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '10px', 
              gap: '10px', 
              borderRadius: '12px',
              borderColor: 'gray.300',
              margin: '15px',
              width: 500
            }}
          >
            <CardMedia
              component="img"
              image={gift?.image || '/placeholder.jpg'}
              alt={gift?.name}
              sx={{
                flex: '0 0',
                width: '130px',
                filter: gift?.quantity === 0 ? 'grayscale(100%)' : ''
              }}
            />
      
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                height: '100%',
                }}
              >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {gift?.name}
                </Typography>
      
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Quantidade restante:
                </Typography>
                <Chip
                  label={`${gift?.quantity} un`}
                  sx={{
                    width: '100%',
                    mb: 1,
                    fontWeight: 'bold',
                    fontSize: 15,
                    bgcolor: '#b2dfdb',
                    color: '#004d40'
                  }}
                />
              </CardContent>
      
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleChooseGift(gift)}
                disabled={loading === gift?.id || gift?.quantity === 0}
                startIcon={loading === gift?.id ? <CircularProgress size={24} color="inherit" /> : null}
              >
                {loading === gift?.id ? 'Carregando...' : 'Escolher'}
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
      </Grid>

      <Dialog
        open={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        sx={{ '& .MuiDialog-paper': { width: '350px', textAlign: 'center', margin: 2 } }}
      >
        <DialogTitle>Escolhido!</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Obrigado por nos avisar! <span style={{ fontSize: 25 }}>🎉✨</span></Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setShowThankYouModal(false)}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default List;

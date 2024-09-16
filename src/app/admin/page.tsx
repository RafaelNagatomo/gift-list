'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Gift {
  id: number;
  name: string;
  quantity: number;
  image?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGift, setCurrentGift] = useState<Gift | null>(null);
  const [formValues, setFormValues] = useState({
    name: '',
    quantity: '',
    image: ''
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const response = await axios.get('/api/gifts');
      setGifts(response.data);
    } catch (error) {
      console.error('Error fetching gifts:', error);
    }
  };

  const handleFormSubmit = async () => {
    if (isEditing && currentGift) {
      await axios.put(`/api/gifts/${currentGift.id}`, formValues);
    } else {
      await axios.post('/api/gifts', formValues);
    }
    fetchGifts();
    setFormValues({ name: '', quantity: '', image: '' });
    setCurrentGift(null);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setIsEditing(false);
    setFormValues({ name: '', quantity: '', image: '' });
    setOpen(true);
  };

  const handleEditOpen = (gift: Gift) => {
    setCurrentGift(gift);
    setFormValues({
      name: gift.name,
      quantity: gift.quantity.toString(),
      image: gift.image || ''
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this gift?');
    if (confirmed) {
      await axios.delete(`/api/gifts/${id}`);
      fetchGifts();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gift Management</h1>

      <Button variant="contained" color="primary" sx={{ my:3 }} onClick={handleClickOpen}>
        Add Gift
      </Button>

      <TableContainer component={Paper} sx={{ my:3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gifts.map((gift) => (
              <TableRow key={gift.id}>
                <TableCell>
                  <CardMedia
                    component="img"
                    src={gift.image || '/placeholder.jpg'}
                    alt={gift.name}
                    sx={{ width: 100, height: 100 }}
                  />
                </TableCell>
                <TableCell>{gift.name}</TableCell>
                <TableCell>{gift.quantity}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <IconButton color="success" onClick={() => handleEditOpen(gift)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(gift.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Gift' : 'Add Gift'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Gift Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            className="mb-4"
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={formValues.quantity}
            onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value })}
            className="mb-4"
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.image}
            onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
            className="mb-4"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            {isEditing ? 'Update Gift' : 'Add Gift'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

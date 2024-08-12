"use client";

import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '@/firebase';
import { collection, getDocs, query, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  p: 4,
  gap: 3,
  display: 'flex',
  flexDirection: 'column',  
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push(doc.id);
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await setDoc(docRef, {});
    updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await deleteDoc(docRef);
    updatePantry();
  };

  return (
    <Box 
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      sx={{
        background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
        color: '#333',
        padding: '20px',
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              id="outlined-basic" 
              label="Item" 
              variant="outlined" 
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
              sx={{
                bgcolor: '#74ebd5',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#ACB6E5',
                },
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{
          bgcolor: '#74ebd5',
          color: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            bgcolor: '#ACB6E5',
          },
        }}
      >
        Add
      </Button>
      <Box 
        width="800px" 
        height="100px" 
        bgcolor="#f0f0f0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        borderRadius="8px"
      > 
        <Typography variant="h2" color="#333" textAlign="center">
          Pantry Items
        </Typography>
      </Box>
      <Box 
        border="1px solid #333"
        width="800px"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        padding="16px"
        bgcolor="white"
      >
        <Stack spacing={2} overflow="auto">
          {pantry.map((i) => (
            <Stack 
              key={i} 
              direction="row" 
              spacing={2} 
              justifyContent="center" 
              alignItems="center"
            >
              <Box
                width="100%"
                height="50px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="#f0f0f0"
                borderRadius="8px"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              >
                <Typography variant="h3" color="#333" textAlign="center" fontWeight="bold">
                  {i.charAt(0).toUpperCase() + i.slice(1)}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                onClick={() => removeItem(i)}
                sx={{
                  bgcolor: '#ff6b6b',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#ff4d4d',
                  },
                }}
              >
                Remove
              </Button>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}


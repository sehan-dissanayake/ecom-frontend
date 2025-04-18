import { useState , useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { Button, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { CreateProductForm } from '../components/CreateProductForm';

export const ProductsPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { products, refreshProducts } = useData();

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateModalOpen(true)}
        >
          Add Product
        </Button>
      </Box>
      
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`$${product.price} - ${product.description}`}
            />
          </ListItem>
        ))}
      </List>
      
      <CreateProductForm
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};
import { useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export const ProductsPage = () => {
  const { products, refreshProducts } = useData();

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
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
    </div>
  );
};
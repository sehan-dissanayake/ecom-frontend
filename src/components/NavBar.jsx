import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        E-Commerce App
      </Typography>
      <Button color="inherit" component={Link} to="/products">
        Products
      </Button>
      <Button color="inherit" component={Link} to="/orders">
        Orders
      </Button>
    </Toolbar>
  </AppBar>
);
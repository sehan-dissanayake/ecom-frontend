import { useAuth } from '../contexts/AuthContext';
import { Button, Typography, Container } from '@mui/material';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {user?.email}
      </Typography>
      <Button 
        variant="contained" 
        color="secondary"
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default ProfilePage;
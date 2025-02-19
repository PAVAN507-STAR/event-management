import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 6,
      }}
    >
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Discover & Join Events That Matter
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Find people with similar interests and participate in exciting events near you.
            </Typography>
            {!user ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" size="large" onClick={() => navigate('/register')} sx={{ px: 4 }}>
                  Get Started
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/login')} sx={{ px: 4 }}>
                  Sign In
                </Button>
              </Box>
            ) : (
              <Button variant="contained" size="large" onClick={() => navigate('/dashboard')} sx={{ px: 4 }}>
                Go to Dashboard
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src="https://cdn.pixabay.com/photo/2023/04/03/12/59/crowd-7896788_1280.jpg"
              alt="Events"
              sx={{ width: '100%', maxWidth: 500, borderRadius: 2, boxShadow: 3 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

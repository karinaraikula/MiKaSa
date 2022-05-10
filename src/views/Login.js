/* eslint-disable max-len */
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useState} from 'react';
import {Button, Container, Box, Divider, Card, Grid} from '@mui/material';
import '../App.css';
// import Image from '../img/taustakuva.jpg';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <Container component="main" maxWidth="xs">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{minHeight: '10vh'}}
      >
        <Grid item xs={3}>
          <img src={'logo1.png'} alt="Logo" />
        </Grid>
      </Grid>


      <Card
        bgcolor="harmaa.main"
        sx={{p: 2, boxShadow: '5', backgroundColor: '#FAF6F6', marginTop: 2}}
        className="loginContainer"
      >
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
          <Divider style={{width: '100%'}}>or</Divider>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{mt: 2, mb: 2}}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            {toggle ? 'Register' : 'Login'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;

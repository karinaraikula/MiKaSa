/* eslint-disable max-len */
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useState} from 'react';
import {Button, Container, Box} from '@mui/material';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
        {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
        OR
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? 'Register' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

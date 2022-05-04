/* eslint-disable max-len */
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useState} from 'react';
import {Button, Container, Box, Divider} from '@mui/material';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <Container component="main" maxWidth="sm" >
      <Box bgcolor="harmaa.main" sx={{p: 2}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
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
      </Box>
    </Container>
  );
};

export default Login;

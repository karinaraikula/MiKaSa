/* eslint-disable no-unused-vars */
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import {
  Home,
  AccountCircle,
  CloudUpload,
  Folder,
  AirplaneTicket,
  BeachAccess,
  QuestionMark,
  StarRate,
  Help,
  AddCircleOutlineRounded,
  LogoutRounded,
} from '@mui/icons-material';

const Nav = () => {
  const {user, setUser} = useContext(MediaContext);
  const [open, setOpen] = useState(false);
  const {getUser} = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem('token'));
      console.log(userData);
      setUser(userData);
    } catch (err) {
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user, open);

  return (
    <Box>
      <AppBar position="static" sx={{width: '100%'}}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 2,
              fontFamily: 'Montserrat',
            }}
          >
            MiKaSa
          </Typography>
          <Button
            component={Link}
            to="/upload"
            color="inherit"
            sx={{
              fontFamily: 'Montserrat',
            }}
          >
            <AddCircleOutlineRounded />
            <ListItemText primary="" />
          </Button>
          <Button
            component={Link}
            to={user ? '/logout' : '/'}
            color="inherit"
            sx={{
              fontFamily: 'Montserrat',
            }}
          >
            {user ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer sx={{width: '200px'}} variant="permanent" anchor="left">
        <img src={'logo192.png'} alt="Logo" />
        <List>
          <ListItemButton component={Link} to={'/home'}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          {user && (
            <>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>

              <Divider />
              <ListItemButton component={Link} to="/inspiration">
                <ListItemIcon>
                  <AirplaneTicket />
                </ListItemIcon>
                <ListItemText primary="Inspiration" />
              </ListItemButton>
              <ListItemButton component={Link} to="/questions">
                <ListItemIcon>
                  <Help />
                </ListItemIcon>
                <ListItemText primary="Questions" />
              </ListItemButton>
              <ListItemButton component={Link} to="/Reviews">
                <ListItemIcon>
                  <BeachAccess />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItemButton>
              <ListItemButton component={Link} to="/Tips">
                <ListItemIcon>
                  <StarRate />
                </ListItemIcon>
                <ListItemText primary="Tips" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Nav;

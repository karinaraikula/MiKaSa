/* eslint-disable no-unused-vars */
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
} from '@mui/material';
import '../App.css';
import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import {Favorite, Logout, MenuOpen} from '@mui/icons-material';

import {MenuBook} from '@mui/icons-material';
import {
  Home,
  AccountCircle,
  AirplaneTicket,
  BeachAccess,
  StarRate,
  TravelExploreOutlined,
  AddToPhotos,
} from '@mui/icons-material';

const Nav = () => {
  const {user, setUser, hakusana, setHakusana} = useContext(MediaContext);
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

  const handleSearch = (event) => {
    setHakusana(event.target.value);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user, open);

  return (
    <Box>
      {user && (
        <>
          <AppBar position="static">
            <Toolbar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{display: 'flex'}}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    <MenuOpen color="harmaa" fontSize="large" />
                  </IconButton>
                </Box>
                <Box sx={{display: 'flex'}}>
                  <Button component={Link} to="/home">
                    <img src={'logo2.png'} alt="Logo" />
                  </Button>
                </Box>
                <Box sx={{display: 'flex'}}>
                  <Button
                    component={Link}
                    to="/upload"
                    color="inherit"
                    sx={{
                      fontFamily: 'Montserrat',
                    }}
                  >
                    <AddToPhotos color="harmaa" fontSize="large" />
                  </Button>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </>
      )}
      {user && (
        <>
          <Drawer
            open={open}
            onClose={() => {
              setOpen(!open);
            }}
          >
            <Button component={Link} to="/home" sx={{padding: '1rem'}}>
              <img src={'logo1.png'} alt="Logo" />
            </Button>
            <TextField
              style={{width: '90%', alignSelf: 'center'}}
              focused
              label="search"
              value={hakusana}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <TravelExploreOutlined color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <List
              onClick={() => {
                setOpen(!open);
              }}
            >
              <ListItemButton component={Link} to={'/home'}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>

              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton component={Link} to="/Favourites">
                <ListItemIcon>
                  <Favorite color="primary" />
                </ListItemIcon>
                <ListItemText primary="Favourites" />
              </ListItemButton>

              <Divider />
              <ListItemButton component={Link} to="/inspiration">
                <ListItemIcon>
                  <AirplaneTicket color="primary" />
                </ListItemIcon>
                <ListItemText primary="Inspiration" />
              </ListItemButton>
              <ListItemButton component={Link} to="/Reviews">
                <ListItemIcon>
                  <BeachAccess color="primary" />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItemButton>
              <ListItemButton component={Link} to="/Tips">
                <ListItemIcon>
                  <StarRate color="primary" />
                </ListItemIcon>
                <ListItemText primary="Tips" />
              </ListItemButton>
              <Divider />
              <Button
                component={Link}
                to={user ? '/logout' : '/'}
                color="primary"
                variant="outlined"
                sx={{margin: '0.7rem'}}
              >
                <Logout color="primary" />
                {user ? 'Logout' : 'Login'}
              </Button>
            </List>
          </Drawer>
        </>
      )}
    </Box>
  );
};
export default Nav;

// skskskk

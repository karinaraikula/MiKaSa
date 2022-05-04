import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import MediaTable from '../components/MediaTable';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {AccountCircle, Badge, ContactMail, Folder} from '@mui/icons-material';
import BackButton from '../components/BackButton';
import {Link} from 'react-router-dom';

const Profile = () => {
  const {user} = useContext(MediaContext);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const {getTag} = useTag();

  const fetchAvatar = async () => {
    if (user) {
      const avatars = await getTag('avatar_' + user.user_id);
      const ava = avatars.pop();
      ava.filename = mediaUrl + ava.filename;
      setAvatar(ava);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [user]);

  return (
    <>
      <BackButton />
      <Typography component="h1" variant="h2">
        {`${user.username}'s profile`}
      </Typography>
      {user && (
        <Card sx={{
          margin: '1rem auto',
          padding: '1rem',
        }}>
          <CardContent>
            <List>
              <Box sx={{display: 'flex'}}>
                <Box sx={{display: 'flex'}}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        variant="circular"
                        src={avatar.filename}
                        imgProps={{
                          alt: `${user.username}'s profile image`,
                        }}
                        sx={{width: '20vh', height: '20vh'}}
                      />
                    </ListItemAvatar>
                  </ListItem>
                </Box>
                <Box sx={{d: 'flex', fd: 'column', alignSelf: 'center'}}>
                  <ListItem>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={user.username} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ContactMail />
                    </ListItemIcon>
                    <ListItemText primary={user.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Badge />
                    </ListItemIcon>
                    <ListItemText primary={user.full_name} />
                  </ListItem>
                  <ListItemButton component={Link} to="/favourites">
                    <ListItemIcon>
                      <Folder />
                    </ListItemIcon>
                    <ListItemText primary="Favourites" />
                  </ListItemButton>
                </Box>
              </Box>
            </List>
          </CardContent>
        </Card>
      )}
      <MediaTable allFiles={false} />
    </>
  );
};

export default Profile;

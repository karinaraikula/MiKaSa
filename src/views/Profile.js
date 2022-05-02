import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {
  Avatar,
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
        <Card flex sx={{justifyContent: 'center'}}>
          <CardContent>
            <List>
              <ListItem>
                <ListItemAvatar sx={{width: '100%'}}>
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
              <ListItemButton component={Link} to="/myfiles">
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary="My Files" />
              </ListItemButton>
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Profile;

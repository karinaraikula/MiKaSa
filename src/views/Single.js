import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  Container,
} from '@mui/material';
import {safeParseJson} from '../utils/functions';
import BackButton from '../components/BackButton';
import {useEffect, useState, useContext} from 'react';
import {useTag} from '../hooks/ApiHooks';
import {BookmarkAdd, BookmarkAdded} from '@mui/icons-material';
import {useFavourite} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';

const Single = () => {
  const {user} = useContext(MediaContext);
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {postFavourite, getFavouritesByFileId, deleteFavourite} =
    useFavourite();
  const [avatar, setAvatar] = useState({});
  const location = useLocation();
  console.log(location);
  const file = location.state.file;
  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  const {getTag} = useTag();

  const fetchAvatar = async () => {
    try {
      if (file) {
        const avatars = await getTag('avatar_' + file.user_id);
        const ava = avatars.pop();
        ava.filename = mediaUrl + ava.filename;
        setAvatar(ava);
        // hae kuvan omistajan tiedot
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await localStorage.getItem('token');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (error) {
      console.error('createFavourite error', error);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await localStorage.getItem('token');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      console.error('removeFavourite error', error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log(avatar);

  return (
    <>
      <BackButton />
      <Typography component="h3" variant="h3">
        {`${file.title}`}
      </Typography>
      <Box
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
          width: '97%',
          margin: '1rem auto',
          padding: '1rem',
        }}
      >
        <CardContent
          sx={{
            margin: 'auto',
            width: '50%',
          }}
        >
          <Card>
            <List>
              <Container flex>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant={'circle'} src={avatar.filename} />
                  </ListItemAvatar>
                  <Typography variant="subtitle2">{file.user_id}</Typography>
                </ListItem>
                <Typography>Likes count: {likes.length}</Typography>
                <Button
                  variant="contained"
                  state={{file}}
                  disabled={userLike}
                  title="Like"
                  onClick={createFavourite}
                >
                  <BookmarkAdd />
                </Button>
                <Button
                  variant="outlined"
                  state={{file}}
                  disabled={!userLike}
                  title="Unlike"
                  onClick={removeFavourite}
                >
                  <BookmarkAdded />
                </Button>
              </Container>
            </List>
            <CardMedia
              component={file.media_type === 'image' ? 'img' : file.media_type}
              controls={true}
              poster={mediaUrl + file.screenshot}
              src={mediaUrl + file.filename}
              alt={file.title}
              sx={{
                height: '60vh',
                filter: `
          brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturation}%)
          sepia(${filters.sepia}%)
          `,
              }}
            />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Box>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;

import {
  Box,
  Button,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {safeParseJson} from '../utils/functions';
import {
  BookmarkAdd,
  BookmarkAdded,
  Delete,
  Edit,
  Visibility,
} from '@mui/icons-material';

import {useFavourite} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import '../App.css';

const MediaRow = ({file, userId, deleteMedia}) => {
  const {user} = useContext(MediaContext);

  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {postFavourite, getFavouritesByFileId, deleteFavourite} =
    useFavourite();

  const doDelete = () => {
    const ok = confirm('Are you sure you want to delete?');
    if (ok) {
      try {
        deleteMedia(file.file_id, localStorage.getItem('token'));
      } catch (err) {
        // console.log(err);
      }
    }
  };

  const {filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
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

  return (
    <ImageListItem key={file.file_id}>
      <ImageListItemBar />

      <img
        src={file.thumbnails ? mediaUrl + file.thumbnails.w320 : 'logo512.png'}
        alt={file.title}
        loading="lazy"
        style={{
          filter: `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        sepia(${filters.sepia}%)
        `,
        }}
      />
      <ImageListItemBar
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          background: 'transparent',
          justifyContent: 'space-between',
        }}
        position="top"
        actionIcon={
          <>
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                sx={{
                  padding: '1rem',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                }}
                color="white"
              >
                {likes.length}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                padding: '0 1rem',
              }}
            >
              {!userLike ? (
                <Button
                  variant="contained"
                  state={{file}}
                  title="Like"
                  onClick={createFavourite}
                >
                  <BookmarkAdd />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  state={{file}}
                  title="Unlike"
                  onClick={removeFavourite}
                >
                  <BookmarkAdded />
                </Button>
              )}
            </Box>
          </>
        }
      ></ImageListItemBar>
      <ImageListItemBar
        actionIcon={
          <>
            <Button
              variant="text"
              component={Link}
              to={'/single'}
              state={{file}}
            >
              <Visibility />
            </Button>
            {userId === file.user_id && (
              <>
                <Button
                  variant="text"
                  component={Link}
                  to={'/modify'}
                  state={{file}}
                >
                  <Edit/>
                </Button>
                <Button variant="text" onClick={doDelete}>
                  <Delete />
                </Button>
              </>
            )}
          </>
        }
        title={file.title}
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  userId: PropTypes.number,
  deleteMedia: PropTypes.func,
};

export default MediaRow;

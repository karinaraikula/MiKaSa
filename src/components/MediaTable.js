/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import PropTypes from 'prop-types';
import {CircularProgress, ImageList} from '@mui/material';
import {useFavourite, useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useState} from 'react';
import {useEffect} from 'react';

const MediaTable = ({allFiles = true, tag, favourites = false}) => {
  const {user, hakusana} = useContext(MediaContext);
  let {mediaArray, loading, deleteMedia} = useMedia(
    allFiles,
    user?.user_id,
    tag,
    favourites,
  );
  const {favouriteMedia} = useFavourite(localStorage.getItem('token'));

  if (favourites) {
    mediaArray = mediaArray.filter((media) => {
      return favouriteMedia.filter((f) => {
       return f.file_id === media.file_id;
      }).pop();
    });
  }

  let searchArray1 = [];
  let searchArray2 = [];

  if (hakusana.length > 0) {
    searchArray1 = mediaArray.filter((media) => {
      return media.title.toUpperCase().includes(hakusana.toUpperCase());
    });
    searchArray2 = mediaArray.filter((media) => {
      return media.description.toUpperCase().includes(hakusana.toUpperCase());
    });
  }

  let searchArray = searchArray1.concat(searchArray2);
  searchArray = searchArray.length === 0 ? mediaArray : searchArray;

  const windowSize = useWindowSize();

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ImageList
          variant="vowen"
          rowHeight={400}
          cols={windowSize.width > 768 ? 3 : 1}
          gap={20}
        >
          {searchArray.map((item, index) => {
            return (
              <MediaRow
                key={index}
                file={item}
                userId={user.user_id}
                deleteMedia={deleteMedia}
              />
            );
          }).reverse()}
        </ImageList>
      )}
    </>
  );
};

MediaTable.propTypes = {
  allFiles: PropTypes.bool,
  tag: PropTypes.string,
  favourites: PropTypes.bool,
};

export default MediaTable;

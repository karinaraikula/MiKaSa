import PropTypes from 'prop-types';
import {CircularProgress, ImageList} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import MediaRow from './MediaRow';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaTable = ({allFiles = true, tag}) => {
  const {user} = useContext(MediaContext);
  const {mediaArray, loading, deleteMedia} = useMedia(
      allFiles,
      user?.user_id,
      tag,
  );
  const windowSize = useWindowSize();
  console.log(mediaArray);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ImageList
          variant="vowen"
          rowHeight={300}
          cols={windowSize.width > 768 ? 3 : 1}
          gap={20}
        >
          {mediaArray.map((item, index) => {
            return (
              <MediaRow
                key={index}
                file={item}
                userId={user.user_id}
                deleteMedia={deleteMedia}
              />
            );
          })}
        </ImageList>
      )}
    </>
  );
};

MediaTable.propTypes = {
  allFiles: PropTypes.bool,
  tag: PropTypes.string,
};

export default MediaTable;

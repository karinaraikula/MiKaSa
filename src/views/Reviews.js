/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import MediaTable from '../components/MediaTable';

const Reviews = () => {
  return (
    <>
      <Typography component="h1" variant="h2">
        Reviews
      </Typography>
      <MediaTable tag="Reviews" />
    </>
  );
};
export default Reviews;

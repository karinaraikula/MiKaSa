/* eslint-disable no-unused-vars */
import {Card, CardContent, Typography} from '@mui/material';
import BackButton from '../components/BackButton';
import MediaTable from '../components/MediaTable';

const Reviews = () => {
  return (
    <>
      <Card
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
            width: '80%',
          }}
        >
          <Typography component="h1" variant="h2">
            Reviews
          </Typography>
          <Typography component="p">
          Read reviews of hotels, restaurants, activities and attractions.
            <br></br> Write the most critical reviews or praise must see
          the destinations.
          </Typography>
        </CardContent>
      </Card>
      <MediaTable tag="Reviews" />
    </>
  );
};
export default Reviews;

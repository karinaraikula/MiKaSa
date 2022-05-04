import MediaTable from '../components/MediaTable';
import {Typography} from '@mui/material';
import BackButton from '../components/BackButton';

const Favourites = () => {
  return (
    <>
      <BackButton />
      <Typography component="h1" variant="h2">
        My favourites
      </Typography>
      <MediaTable favourites={true} />
    </>
  );
};

export default Favourites;

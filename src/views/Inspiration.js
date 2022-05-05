import {Card, CardContent, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';

const Inspiration = () => {
  return (
    <>
      <Card
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
          width: '97%',
          margin: '1rem auto',
          padding: '1rem',
          backgroundColor: '#FAF6F6',

        }}
      >
        <CardContent
          sx={{
            margin: 'auto',
            width: '80%',
          }}
        >
          <Typography component="h1" variant="h2">
            Inspiration
          </Typography>
          <Typography component="p">
          Get inspired by others and share your inspiration! <br></br>
             Here you will find the most amazing pictures and
             and the most amazing travel experiences.
          </Typography>
        </CardContent>
      </Card>
      <MediaTable tag="Inspiration" />
    </>
  );
};

export default Inspiration;

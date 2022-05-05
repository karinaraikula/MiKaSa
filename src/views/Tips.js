import {Card, CardContent, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';

const Tips = () => {
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
            Tips
          </Typography>
          <Typography component="p">
          Learn from others or share the best tips collected along the way!
            <br></br>Tell others what to pack for a backpacking trip in Norway,
          how to manage without <br></br>speaking a word of the local language
          or how to survive a week in the jungle.
          </Typography>
        </CardContent>
      </Card>
      <MediaTable tag="Tips" />
    </>
  );
};

export default Tips;

import MediaTable from '../components/MediaTable';
import {Card, CardContent, Typography} from '@mui/material';

const Home = () => {
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
            Home
          </Typography>
          <Typography component="p">
          MiKaSa is intended for sharing travelling related inspiration, images,
          tips and reviews. Uncover your most memorable travel experiences,
          share the most amazing sunset photos, hint the best packing tips,
          or share the most critical reviews. Below you can browse recently
          added posts to the site.
          </Typography>
        </CardContent>
      </Card>
      <MediaTable />
    </>
  );
};

export default Home;

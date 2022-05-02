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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </Card>
      <MediaTable />
    </>
  );
};

export default Home;

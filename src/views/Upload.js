/* eslint-disable indent */
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Slider,
  TextareaAutosize,
  Typography,
  Input,
} from '@mui/material';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {useState, useEffect} from 'react';
import {appID} from '../utils/variables';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import {AirplaneTicket, BeachAccess, StarRate} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

const Upload = () => {
  const [preview, setPreview] = useState('logo192.png');
  const alkuarvot = {
    title: '',
    description: '',
    file: null,
  };

  const filterarvot = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const category = {
    Radiobutton: '',
  };

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    username: ['required field', 'minimum 3 characters'],
    description: ['minimum 5 characters'],
  };

  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      console.log('doUpload');
      // lisätään filtterit descriptioniin
      const desc = {
        description: inputs.description,
        filters: filterInputs,
      };
      const token = localStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('title', inputs.title);
      formdata.append('description', JSON.stringify(desc));
      formdata.append('file', inputs.file);
      // tähän?
      const mediaData = await postMedia(formdata, token);
      const tagData = await postTag(
        {
          file_id: mediaData.file_id,
          tag: appID,
        },
        token,
      );

      await postTag(
        {
          file_id: mediaData.file_id,
          tag: categoryInputs.Radiobutton + appID,
        },
        token,
      );
      confirm(tagData.message) && navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    alkuarvot,
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filterarvot,
  );

  const {inputs: categoryInputs, handleInputChange: handleRadiobuttonChange} =
    useForm(null, category);

  useEffect(() => {
    if (inputs.file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(inputs.file);
    }
  }, [inputs.file]);

  console.log(inputs, filterInputs, categoryInputs);

  return (
    <>
      <BackButton />
      <Grid
        item
        container
        xs={12}
        md={8}
        flex
        spacing={1}
        sx={{
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Card
          sx={{
            margin: 'auto',
            padding: '4vh',
            justifyContent: 'center',
            boxShadow: '3',
          }}
        >
          <Box>
            <Typography component="h1" variant="h2" gutterBottom>
              Upload
            </Typography>
            </Box>
          <Box
            item
            xs={12}
            sm={8}
            sx={{
              textAlign: 'left',
              padding: '0em',
              display: 'flex',
              flexWrap: 'nowrap',
              flexDirection: 'column',
            }}
          >
            <Box sx={{padding: '1rem 0'}}>
              <AirplaneTicket
                color="primary"
                sx={{padding: '0 0.3rem', margin: '-0.2rem 0'}}
              />
              <input
                type="radio"
                value="Inspiration"
                name="Radiobutton"
                onChange={handleRadiobuttonChange}
              />{' '}
              Inspiration
            </Box>
            <Box sx={{padding: '1rem 0'}}>
              <BeachAccess
                color="primary"
                sx={{padding: '0 0.3rem', margin: '-0.2rem 0'}}
              />
              <input
                type="radio"
                value="Reviews"
                name="Radiobutton"
                onChange={handleRadiobuttonChange}
              />{' '}
              Reviews
            </Box>
            <Box sx={{padding: '1rem 0'}}>
              <StarRate
                color="primary"
                sx={{padding: '0 0.3rem', margin: '-0.2rem 0'}}
              />
              <input
                type="radio"
                value="Tips"
                name="Radiobutton"
                onChange={handleRadiobuttonChange}
              />{' '}
              Tips
            </Box>
          </Box>
          <Box item xs={12} sm={8} sx={{}}>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                fullWidth
                placeholder="title"
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
                validators={validators.title}
                errorMessages={errorMessages.title}
                sx={{width: '100%', mt: 0, mb: 2}}
              />
              <TextareaAutosize
                style={{width: '95%', borderRadius: 18, padding: 10}}
                multiLine
                minRows={4}
                placeholder="description"
                name="description"
                onChange={handleInputChange}
                value={inputs.description}
                validators={validators.description}
                errorMessages={errorMessages.description}
                sx={{mt: 2, mb: 2}}
              />

              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*, video/*, audio/*"
                  style={{display: 'none'}}
                  id="contained-button-file"
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  fullWidth
                  component="span"
                  sx={{mt: 2, mb: 2}}>
                    <AddIcon/>
                  Choose a photo
                </Button>
              </label>

              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{mb: 2}}
                  disabled={!inputs.file}
                >
                  Upload
                </Button>
              )}
            </ValidatorForm>
          </Box>

        {inputs.file && (
          <Grid container flex sx={{justifyContent: 'center'}}>
            <Grid center item xs={12} sm={8}>
              <img
                style={{
                  width: '100%',
                  margin: 'auto',
                  filter: `
              brightness(${filterInputs.brightness}%)
              contrast(${filterInputs.contrast}%)
              saturate(${filterInputs.saturation}%)
              sepia(${filterInputs.sepia}%)
              `,
                }}
                src={preview}
                alt="preview"
              />
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Typography>Brightness</Typography>
                <Slider
                  name="brightness"
                  min={0}
                  max={200}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.brightness}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Contrast</Typography>
                <Slider
                  name="contrast"
                  min={0}
                  max={200}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.contrast}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Saturation</Typography>
                <Slider
                  name="saturation"
                  min={0}
                  max={200}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.saturation}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Sepia</Typography>
                <Slider
                  name="sepia"
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="on"
                  onChange={handleSliderChange}
                  value={filterInputs.sepia}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        </Card>
      </Grid>
    </>
  );
};

export default Upload;

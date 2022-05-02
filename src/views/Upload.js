import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Slider,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {useState, useEffect} from 'react';
import {appID} from '../utils/variables';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';

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
        token
      );

      await postTag(
        {
          file_id: mediaData.file_id,
          tag: categoryInputs.Radiobutton + appID,
        },
        token
      );
      confirm(tagData.message) && navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    alkuarvot
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filterarvot
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
      <Card
        xs={12}
        sm={8}
        sx={{
          width: '50%',
          margin: 'auto',
          padding: '4vh',
          justifyContent: 'center',
          boxShadow: '3',
        }}
      >
        <Grid
          container
          flex
          sx={{
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={8} sx={{}}>
            <Typography component="h1" variant="h2" gutterBottom>
              Upload
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} sx={{}}>
            <input
              type="radio"
              value="Inspiration"
              name="Radiobutton"
              onChange={handleRadiobuttonChange}
            />{' '}
            Inspiration
            <input
              type="radio"
              value="Questions"
              name="Radiobutton"
              onChange={handleRadiobuttonChange}
            />{' '}
            Questions
            <input
              type="radio"
              value="Reviews"
              name="Radiobutton"
              onChange={handleRadiobuttonChange}
            />{' '}
            Reviews
            <input
              type="radio"
              value="Tips"
              name="Radiobutton"
              onChange={handleRadiobuttonChange}
            />{' '}
            Tips
          </Grid>
          <Grid item xs={12} sm={8} sx={{}}>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                fullWidth
                placeholder="title"
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
                validators={validators.title}
                errorMessages={errorMessages.title}
              />
              <TextareaAutosize
                style={{width: 380, borderRadius: 10}}
                multiLine
                minRows={4}
                placeholder="description"
                name="description"
                onChange={handleInputChange}
                value={inputs.description}
                validators={validators.description}
                errorMessages={errorMessages.description}
              />

              <TextValidator
                fullWidth
                type="file"
                name="file"
                accept="image/*, video/*, audio/*"
                onChange={handleInputChange}
              />

              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={!inputs.file}
                >
                  Upload
                </Button>
              )}
            </ValidatorForm>
          </Grid>
        </Grid>
        {inputs.file && (
          <Grid container sx={{justifyContent: 'center'}}>
            <Grid center item xs={12} sm={4}>
              <img
                style={{
                  width: '100%',

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
    </>
  );
};

export default Upload;

/* eslint-disable indent */
import {
  Button,
  CircularProgress,
  Grid,
  Slider,
  Typography,
} from '@mui/material';
import {useMedia} from '../hooks/ApiHooks';
import {useNavigate, useLocation} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {safeParseJson} from '../utils/functions';
import {mediaUrl} from '../utils/variables';
import BackButton from '../components/BackButton';
import {Card} from '@mui/material';

const Modify = () => {
  const location = useLocation();
  const file = location.state.file;
  const {description, filters} = safeParseJson(file.description) || {
    description: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };

  console.log(file);

  const alkuarvot = {
    title: file.title,
    description: description,
  };

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    username: ['required field', 'minimum 3 characters'],
    description: ['minimum 5 characters'],
  };

  const {putMedia, loading} = useMedia();
  const navigate = useNavigate();

  const doModify = async () => {
    try {
      console.log('doModify');
      // lisätään filtterit descriptioniin
      const desc = {
        description: inputs.description,
        filters: filterInputs,
      };
      // tee sopiva objekti lähetettäväksi
      const data = {
        title: inputs.title,
        description: JSON.stringify(desc),
      };

      const token = localStorage.getItem('token');
      const mediaData = await putMedia(file.file_id, data, token);
      confirm(mediaData.message) && navigate(-1);
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doModify,
    alkuarvot,
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filters,
  );

  console.log(inputs, filterInputs);

  return (
    <>
      <BackButton />
      <Grid container flex xs={12} md={8} sx={{margin: 'auto'}}>
        <Grid item flex>

        </Grid>
        <Card sx={{
           margin: 'auto',
            padding: '4vh',
            justifyContent: 'center',
            boxShadow: '3'}}>
              <Typography component="h1" variant="h2" gutterBottom>
            Modify
          </Typography>
          <Grid item>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                fullWidth
                placeholder="title"
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
                validators={validators.title}
                errorMessages={errorMessages.title}
                sx={{margin: '0 0 1rem 0'}}
              />
              <TextValidator
                fullWidth
                placeholder="description"
                name="description"
                onChange={handleInputChange}
                value={inputs.description}
                validators={validators.description}
                errorMessages={errorMessages.description}
                sx={{margin: '0 0 1rem 0'}}
              />

              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{margin: '0 0 1rem 0'}}
                >
                  Save
                </Button>
              )}
            </ValidatorForm>
          </Grid>

          {file && (
            <Grid container flex sx={{justifyContent: 'center'}}>
              <Grid item center xs={12} sm={8}>
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
                  src={mediaUrl + file.filename}
                  alt="preview"
                />
              </Grid>
              <Grid container flex>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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

export default Modify;

import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Spotify from '../core/Spotify';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'playlistTitle',
    'status',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });  
  return errors;
}

class PlaylistInfo extends React.Component {

  renderTextField = ({input, label}) => {
    return (
      <TextField 
        id="outlined-name"
        label={label}
        variant="outlined"
        {...input}
        margin="normal"
        fullWidth
        color="secondary"
      />
    )
  }
  onSubmit = formValues => {
    Spotify.login().then(() => {
      console.log('login :');
    })
  }

  renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
      {...input}
      {...rest}
      value={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Typography variant="h4" component="h6" color="textSecondary" style={{marginTop:50}}>
          Playlist Info
        </Typography>
        <Field name="playlistTitle" component={this.renderTextField} label="Title" />
        <Typography variant="h5" component="h5" color="textSecondary" style={{marginTop:10, marginBottom:10}}>
          Status
        </Typography>
        <Field name="status" component={this.renderRadioGroup} style={{display:"flex",  flexDirection: 'row', marginBottom:10}}>
          <FormControlLabel  value="private" control={<Radio />} label="Private" />
          <FormControlLabel  value="public" control={<Radio />} label="Public" />
        </Field>
        <Button variant="contained" color="secondary" type="submit" size="large" fullWidth>
          Save on Spotify
        </Button>
      </form>
    )
  }
}

const playlistValues = reduxForm({
  form: 'playlistInfo',
  validate
})(PlaylistInfo);

export default connect(null, {})(playlistValues);
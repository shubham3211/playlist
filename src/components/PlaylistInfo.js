import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
        // variant="outlined"
        {...input}
        margin="normal"
      />
    )
  }

  onSubmit = formValues => {
    this.props.playlistForm({title: formValues.playlistTitle, status: formValues.status})
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
        <Field name="playlistTitle" component={this.renderTextField} label="Title" />
        <Field name="status" component={this.renderRadioGroup}>
          <FormControlLabel  value="private" control={<Radio />} label="Private" />
          <FormControlLabel  value="public" control={<Radio />} label="Public" />
        </Field>
        <Button variant="contained" color="primary" type="submit">
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
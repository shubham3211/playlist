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
import AlertDialog from './Modal'
import {modalAction} from '../actions/modalAction'

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

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      showModal: this.props.showModal
    }
    console.log("constructor")
  }

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
    this.props.changeLoading();
    Spotify.getCurrentUser().then((user) => {
      return Spotify.createPlaylist(user.body.id, formValues.playlistTitle, formValues.status==="public" ? true: false)
    }).then((playlist) => {
      this.playlist = playlist.body.external_urls.spotify; 
      return Spotify.addTracksToPlaylist(playlist.body.owner.id, playlist.body.id, this.props.tracks);
    }).then((snapshot) => {
      this.props.changeLoading();
      this.props.modalAction(true);
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
  
  closeModal = () => {
    this.props.modalAction(false);
  }  

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
        {this.props.showModal ? <AlertDialog src={this.props.selectedSong.album.images[0].url} playlist={this.playlist} closeModal={this.closeModal}/> : null}
      </form>
    )
  }
}

const playlistValues = reduxForm({
  form: 'playlistInfo',
  validate
})(PlaylistInfo);

const mapStateToProps = (state) => {
  return {
    tracks: state.playlistCreated,
    selectedSong: state.selectedSong,
    showModal: state.showModal
  }
}

export default connect(mapStateToProps, {modalAction})(playlistValues);
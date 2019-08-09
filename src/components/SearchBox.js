import React from 'react';
import Spotify from '../core/Spotify'
import AutoSuggest from 'react-autosuggest';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import selectedSong from '../actions/selectedSong';
import {createPlaylist} from '../actions/createPlaylist';
import Loading from './Loading'
import Typography from '@material-ui/core/Typography';

class SearchBox extends React.Component {  

  constructor() {
    super();
    this.state = {
      value: '',
      suggestion: [],
      loading: false
    };
  }

  componentDidUpdate() {
    if(this.props.playlist.length !==0 ){
      this.props.changeComponent();
    }
  }

  getSuggestions = ({value}) => {
    Spotify.search(value);
    return new Promise((resolve, reject) => {
      if(value.trim().length<=3){
        resolve(this.state.suggestion);
      }else {
        Spotify.search(value.trim()).then((data) => {
          let tracks = [];
          data.body.tracks.items.forEach(element => {
            tracks.push(element);
          });
          resolve(tracks);
        }).catch((err) => {
          reject(err);
        })
      }
    })
  }

  getSuggestionValue = track => `${track.name}, ${track.artists[0].name}`;
  
  renderSuggestion = suggestion => {
    return (
      <ListItem button divider>
        <ListItemText primary={`${suggestion.name}, ${suggestion.artists[0].name}`} />
      </ListItem>
    )
  }

  onSuggestionsFetchRequested = (value) => {
    this.getSuggestions(value).then((suggestion) => {
      this.setState({
        suggestion: suggestion
      })
    }).catch((err) => {
      console.log('err :', err);
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestion: []
    })
  }

  handleSearch = (song) => {
    this.props.selectedSong(song);
    this.props.createPlaylist(song);
    this.setState({
      loading: true
    })
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.handleSearch(suggestion);
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }

  render() {

    const {value, suggestion} = this.state;
    const inputProps = {
      placeholder: 'Type a song title',
      value,
      onChange: this.onChange
    }
    //   
    return !this.state.loading ? (
      <Grid container direction="row" justify="center" alignItems="center" style={{background:"linear-gradient(135deg,#121242,#ff5a72)", height:"600px"}}>
        <Grid item xs={6} style={{top:"", position:""}}>
          <AutoSuggest
            suggestions = {suggestion}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
        </Grid>
      </Grid>
    ): (<div><Loading /></div>)
  }
}

const mapStateToProps = state => {
  return {
    selectedSong: state.selectedSong,
    playlist: state.playlistCreated
  }
}

export default connect(mapStateToProps, {selectedSong, createPlaylist})(SearchBox);


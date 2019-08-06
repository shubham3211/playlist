import React from 'react';
import Spotify from '../core/Spotify'
import AutoSuggest from 'react-autosuggest';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import {selectedSong} from '../actions/selectedSong';
import playlistCreate from '../actions/createPlaylist';
import '../styles/style.css'

class SearchBox extends React.Component {  

  constructor() {
    super();
    this.state = {
      value: '',
      suggestion: []
    };
  }

  componentDidMount() {
    
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
            // console.log(element);
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

  makePlaylist = (song) => {
    Spotify.makePlaylist(song).then((playlist) => {
      this.props.playlistCreate(playlist);
    })
  }

  handleSearch = (song) => {
    this.props.selectedSong(song);
    this.makePlaylist(song);
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
    console.log("hello");
    return (
      <Grid container spacing={3}>
        <Grid item xs={5}>
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
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedSong: state.selectedSong
  }
}

export default connect(mapStateToProps, {selectedSong, playlistCreate})(SearchBox);


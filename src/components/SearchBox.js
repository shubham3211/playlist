import React from 'react';
import Spotify from '../core/Spotify'
import AutoSuggest from 'react-autosuggest';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import selectedSong from '../actions/selectedSong';
import {createPlaylist} from '../actions/createPlaylist';

class SearchBox extends React.Component {  

  constructor() {
    super();
    this.state = {
      value: '',
      suggestion: [],
    };
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
    this.props.changeLoading();
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

    return (  
      <AutoSuggest
        suggestions = {suggestion}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedSong: state.selectedSong,
    playlist: state.playlistCreated
  }
}

export default connect(mapStateToProps, {selectedSong, createPlaylist})(SearchBox);


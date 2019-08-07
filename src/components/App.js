import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchBox from './SearchBox';
import FeaturedPlaylist from './FeaturedPlaylist';
import Playlist from './Playlist';
import Spotify from '../core/Spotify'

class App extends React.Component {
  componentDidMount() {
	  let hashParams = {};
	  let e, r = /([^&;=]+)=?([^&;]*)/g,
	    q = window.location.hash.substring(1);
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
	  }

	  if(!hashParams.access_token) {
	    window.location.href = 'https://accounts.spotify.com/authorize?client_id=9bc9cd6f229443d5b183b2111b3901b1&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
	  } else {
	    Spotify.setAccessToken(hashParams.access_token);
	  }
	}

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <SearchBox />
          <Playlist />
          {/* <FeaturedPlaylist /> */}
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
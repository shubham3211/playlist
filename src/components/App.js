import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeaturedPlaylist from './FeaturedPlaylist';
import Playlist from './Playlist';
import Spotify from '../core/Spotify'
import Homepage from './Homepage';
import Loading from './Loading';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      app: true,
      hashParams: {},
    }
  }

  componentDidMount() {
	  let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1), hashParams={};
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
	  }

	  if(!hashParams.access_token) {
	    window.location.href = 'https://accounts.spotify.com/authorize?client_id=9bc9cd6f229443d5b183b2111b3901b1&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
	  } else {
      Spotify.setAccessToken(hashParams.access_token);
      this.setState({hashParams: hashParams})
    }
	}

  changeComponent = () => {
    this.setState({
      app: false
    })
  }

  render() {
    return (
      this.state.app ? (
        <React.Fragment>
          <CssBaseline />
            <Homepage changeComponent={this.changeComponent} hashParams={this.state.hashParams} />
        </React.Fragment>
      ) : (<Playlist />)
    )
  }
}

export default App;
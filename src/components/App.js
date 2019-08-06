import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchBox from './SearchBox';
import FeaturedPlaylist from './FeaturedPlaylist';
import Playlist from './Playlist';

const App = () => {
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

export default App;
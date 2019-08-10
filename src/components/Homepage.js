import React from 'react';
import Grid from '@material-ui/core/Grid';
import SearchBox from './SearchBox'
import Typography from '@material-ui/core/Typography';
import FeaturedPlaylist from './FeaturedPlaylist'
import Loading from './Loading';
import {connect} from 'react-redux';

class Homepage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  changeLoading = () => {
    this.setState({
      loading: true
    })
  }

  componentDidUpdate() {
    if(this.props.playlist.length !==0 ){
      this.props.changeComponent();
    }
  }

  render() {
    return !this.state.loading ? (
      <Grid>
        <Grid container direction="row" justify="center" alignItems="center" style={{background:"linear-gradient(135deg,#121242,#ff5a72)", height:"600px"}}>
          <Grid item style={{position:"absolute", top:"100px"}}>
            <Typography variant="h2" style={{color:"white"}}>Live with music</Typography>
          </Grid>
          <Grid item style={{position:"absolute", top:"175px"}}>
            <Typography variant="h6" style={{color:"white"}}>
              Make the playlist of your dreams based on a song. Try for Free.
            </Typography>
          </Grid>
          <Grid item xs={6} style={{top:"", position:""}}>
            <SearchBox changeLoading={this.changeLoading}/>
          </Grid>
        </Grid>
        {this.props.hashParams.access_token ? <FeaturedPlaylist /> : null}
      </Grid>
    ) : (<Loading />)
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlistCreated
  }
}

export default connect(mapStateToProps, {})(Homepage);

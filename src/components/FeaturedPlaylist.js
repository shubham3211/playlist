import React from 'react';
import {connect} from 'react-redux';
import  {addFeaturedPlaylist} from '../actions/featuredPlaylist';
import  Spotify from '../core/Spotify'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import {PlayArrow, Share, Favorite} from "@material-ui/icons/";
import Container from '@material-ui/core/Container';

class FeaturedPlaylist extends React.Component {
  renderList() {
    return this.props.playlists.map((playlist, index) => (
      <Grid item key={index} xs={3}>
        <Card>
          <CardActionArea>
            <CardMedia 
              image={playlist.images[0].url}
              style={{height: 300}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5"  component="h2">
                {playlist.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton href={playlist.external_urls.spotify} target="_blank">
              <PlayArrow />
            </IconButton>
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      )
    )
  }

  componentDidMount() {
    Spotify.recentPlaylist().then((data) => {
      this.props.addFeaturedPlaylist(data.body.playlists.items)
      console.log(data);
    }).catch((err) => {
      throw new Error(err);
    })
  }

  render() {
    return (
      <Container>
        <Typography variant="h4" color="textSecondary" style={{marginBottom:"10px", marginTop:"10px"}}>Recent Playlist</Typography>
        <Grid container spacing={4}>
          {this.renderList()}
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlists: state.featuredPlaylist
  }
}

export default connect(mapStateToProps, {addFeaturedPlaylist})(FeaturedPlaylist);
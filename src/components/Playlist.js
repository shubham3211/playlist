import React from 'react';
import {connect} from 'react-redux';
import { Grid, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Replay from '@material-ui/icons/Replay';
import Delete from '@material-ui/icons/Delete';
import DragHandle from '@material-ui/icons/DragHandleTwoTone'
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import PlaylistInfo from './PlaylistInfo';
import Player from './Player';
import {deleteSong} from '../actions/createPlaylist';
import selectSong from '../actions/selectedSong';
import {createPlaylist} from '../actions/createPlaylist';
import Loading from './Loading'

const LiItem = styled(ListItem)`
  .icons {
    visibility: hidden
  }
  :hover {
    .icons{
      visibility: visible
    }
  }
`;

class Playlist extends React.Component {

  constructor (props){
    super(props);
    this.currentAudioElement = '';
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    console.log("palylist", this.props.playlist);
    if(this.props.playlist.length!==0){
      this.setState({isLoading: false});
    }
  }

  addAudioElement = (audioElement) => {
    this.currentAudioElement = audioElement;
  }

  pauseAll = () => {
    if(this.currentAudioElement)
        this.currentAudioElement.pause();
  }

  changeLoading = () => {
    this.setState((state) => {
      return {
        loading: !state.loading
      }
    })
  }

  renderList = ({style, index}) => {
    console.log(this.props.playlist[0].preview_url);
    return (
      <LiItem button key={index} style={style} divider>
        <ListItemIcon className="icons">
          <IconButton size="small" color="primary" aria-label="add">
            <DragHandle />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={`${this.props.playlist[index].album.name}, ${this.props.playlist[index].artists[0].name}`} />
        <Player src={this.props.playlist[index].preview_url} 
          pauseAll={this.pauseAll}
          addAudioElement={this.addAudioElement}
        />
        <ListItemIcon className="icons" onClick={() => {this.props.selectSong(this.props.playlist[index]) 
                                                        this.props.createPlaylist(this.props.playlist[index])}}>
          <IconButton size="small" color="primary" aria-label="add">
            <Replay />
          </IconButton>
        </ListItemIcon>
        <ListItemIcon className="icons" onClick={() => this.props.deleteSong(index)}>
          <IconButton size="small" color="primary" aria-label="add" >
            <Delete />
          </IconButton>
        </ListItemIcon>
      </LiItem>
    )
  }

  render(){
    return !this.state.loading ? (
      <Grid container spacing={3}>
        {/* <FeaturedPlaylist /> */}
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <GridList cellHeight={300} spacing={1}>
                <GridListTile cols={2}>
                  <img src={this.props.selectedSong.album.images[0].url} alt={this.props.selectedSong.album.name}/>
                  <GridListTileBar 
                    title={`${this.props.selectedSong.album.name}, ${this.props.selectedSong.album.artists[0].name}`}
                    style={{background:
                      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  />
                </GridListTile>
              </GridList>
            </Grid>
            <Grid item xs={12}>
              <FixedSizeList height={300} width={848} itemSize={50} itemCount={this.props.playlist.length}> 
                {this.renderList}
              </FixedSizeList>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <PlaylistInfo changeLoading={this.changeLoading} />        
        </Grid>
      </Grid>
    ): (<Loading />)
  }
}

const mapStateToProps = state => {
  return {
    selectedSong: state.selectedSong,
    playlist: state.playlistCreated
  }
}

export default connect(mapStateToProps, {deleteSong, selectSong, createPlaylist})(Playlist);
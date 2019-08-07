import React from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      pause: false
    }
    this.audioElement = React.createRef();
  }

  play = () => {
    this.setState({
      playing: false,
      pause: true
    })
    this.props.pauseAll();
    this.props.addAudioElement(this.audioElement.current);
    this.audioElement.current.play();
  }

  pause = () => {
    this.setState({
      playing: true,
      pause: false
    })
    this.audioElement.current.pause();
  }

  render () {
    return (
      <div>
        {this.state.playing ?
          <ListItemIcon className="icons">
            <IconButton size="small" color="primary" aria-label="add" onClick={this.play}>
              <PlayArrow />
            </IconButton>
          </ListItemIcon> : null
        }
        {this.state.pause ?
          <ListItemIcon className="icons">
            <IconButton size="small" color="primary" aria-label="add" onClick={this.pause}>
              <Pause />
            </IconButton>
          </ListItemIcon> : null
        }
        <audio src={this.props.src} ref={this.audioElement}/>
      </div>
    )
  }
}

export default Player;
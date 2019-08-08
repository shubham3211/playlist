import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear'

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <IconButton size="small" color="primary" aria-label="add" onClick={handleClose}>
            <Clear />
          </IconButton>
        </DialogActions>
        <DialogTitle id="alert-dialog-title" align="center">{"Congrats! ! Your playlist is waiting for you."}</DialogTitle>
        <DialogContent>
          <div className="confirm_cover_back" style={{marginTop:""}}></div>
          <div className="confirm_cover_back" style={{width:"250px"}}></div>
            <img src={props.src} width="50%" height="50%" style={{marginLeft:"137px",marginTop:"",borderRadius:"15px"}} />
            <DialogContentText id="alert-dialog-description" align="center">
              How Good Is Your New Playlist ?
              <br />
              <a href={props.playlist} target="_blank">Click Here To Play</a>
            </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import LinearQueryLoading from '../components/query.loading';
import Cached from '@material-ui/icons/Cached';
import Close from '@material-ui/icons/Close';
import Favorite from '@material-ui/icons/Favorite'
function RandomJokeDialog(props) {

  const { fullScreen } = props;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.onClose}
        disableEscapeKeyDown={true}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{`Random ${props.category} Joke`}</DialogTitle>
        <LinearQueryLoading isQueryLoading={props.isLoading} />
        <DialogContent>
          <DialogContentText>
            {props.joke && props.joke.value}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary">
            CLOSE
            <Close className={props.iconClass} />
          </Button>
          <Button onClick={props.onFetch} color="secondary">
            NEXT
            <Cached className={props.iconClass} />
          </Button>
          <Button onClick={props.onLike} color="primary" autoFocus>
            ADD TO FAVOURITES
            <Favorite className={props.iconClass} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

RandomJokeDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(RandomJokeDialog);
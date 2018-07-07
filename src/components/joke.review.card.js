import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  getCurrentDate = (() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;

    return `${dd}/${mm}/${yyyy}`;
  });

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Joke" className={classes.avatar}>
                {this.props.joke.value.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title="Chuck Joke"
            subheader= {this.getCurrentDate()}
          />
          <CardContent>
            <Typography component="p">
              {this.props.joke.value}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon color={this.props.isFev}/>
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Joke Info:
              </Typography>
              <Typography noWrap>
               <strong>Icon</strong>: {this.props.joke.icon_url}
              </Typography>
              <Typography >
                <strong>API ID</strong> : {this.props.joke.id}
              </Typography>
              <Typography>
                <strong>API URL</strong> : You lucky, Chuck found you <a href={this.props.joke.url} target="_blank">here</a> 
              </Typography>
              <hr/>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

ReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewCard);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import ReviewCard from './joke.review.card';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 400,
  },
});

function FullWidthGrid(props) {

  const { classes } = props;

  const jokesArray = props.jokes;
  const listItems = jokesArray.map((joke, index, arr) =>
    <Grid item xs={12} sm={6} key={index}>
      <ReviewCard joke={joke} isFev={props.isFev}/>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        {listItems}
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);

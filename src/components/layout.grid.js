import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReviewCard from './joke.review.card';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

function FullWidthGrid(props) {

  const { classes } = props;

  const jokesArray = props.jokes;

  const isEmpty = props.jokes.length === 0 || props.isFetching;

  if( !isEmpty ) {
    const listItems = jokesArray.map((joke, index, arr) =>
      <Grid item 
        xs={12} 
        sm={6}
        md={6}
        lg={4}
        xl={3} 
        key={index}>
        <ReviewCard joke={joke} isFev={props.isFev} addToFavourites = {props.addToFavourites}/>
      </Grid>);
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          {listItems}
        </Grid>
      </div>
    );
  }
  else
  {
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="display4" gutterBottom>
                  Loading...
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
    );
  }
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);

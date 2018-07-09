import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import withRoot from '../withRoot';
import SearchForm from '../components/search.form';
import FullWidthGrid from '../components/layout.grid';
import WelcomeGrid from '../components/welcome'
import LinearQueryLoading from '../components/query.loading';
import RandomJokeDialog from '../components/random.joke.dialog';
import AppSnackbar from '../components/app.snack.bar';
import {
  addToFavorites
  , removeFromFavorites
  , fetchJokes
  , fetchCategories
  , fetchRandomJoke
  , receiveJokeFailed
  , dialogToogle
  , mobileToogle
  , searchTextOnChange
  , snackBarToogle
} from '../actions'

/*
 *___Action_Creators___
 * addToFavorites
 * removeFromFavorites
 * switchCategories
 * requestJoke
 * receiveJoke
 * fetchJokes
 * fetchCategories
 * fetchRandomJoke
 * requestCategories
 * shouldFetchCategory
 * switchCategory
 * receiveCategories
 * cardCollapseToogle
 * shareJoke
 * dialogOpen
 * dialogClose
 */

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class App extends React.Component {

/**
 * @memberof App
 */
componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

/**
 * @memberof App
 */
componentWillReceiveProps = (nextProps) => {
    if (nextProps.categories.length !== this.props.categories.length) {
      const { dispatch } = nextProps
      dispatch(fetchCategories());
    }
  }

  /**
   *Handle Drawer Toogle
   * @memberof App
   */
  handleDrawerToggle = () => {
    this.props.dispatch(mobileToogle());
  };

  /**
   *Handle Enter Key Press on the Searchbox
   * @memberof App
   */
  handleKeyPress = (event) => {
    const { dispatch } = this.props;
    if (event.target.value && event.key === 'Enter') {
      dispatch(fetchJokes(event.target.value));
    } else {
      dispatch(receiveJokeFailed());
    }
  };

  handleSearchOnSubmit = () => {
    const { dispatch, searchText } = this.props;
    if (searchText && searchText !== "") {
      dispatch(fetchJokes(searchText));
    } else {
      dispatch(receiveJokeFailed());
    }
  };

/**
 * Update state Search Text using the input onChange event 
 * @memberof App
 */
handleSearchTextOnChange = (text) => {
    const {dispatch} = this.props;
    dispatch(searchTextOnChange(text));
  }

  /**
   *Handle the opening / closing of our joke dialog
   * @memberof App
   */
  handleDialogToogleDialog = () => {
    const { dispatch } = this.props;
    dispatch(dialogToogle());
  };

  /**
   *Fired when the user refreshes the Joke
   * @memberof App
   */
  handleRefreshJoke = (category) => {
    const { dispatch } = this.props;
    dispatch(fetchRandomJoke(category));
  }

  /**
   *Fired when the category list is clicked
   * @memberof App
   */
  handleCategoryClick = (category) => {
    const { dispatch } = this.props;
    dispatch(dialogToogle());
    dispatch(mobileToogle());
    dispatch(fetchRandomJoke(category));
  };

  /**
   * Add joke to favourites
   * @memberof App
   */
  handleFavourites = (joke) => {
    const { dispatch } = this.props;
    dispatch(addToFavorites(joke));
    //dispatch(handleFavourites(joke, favourites));
  };

 /**
 * Add / Remove joke from fevs
 * @memberof App
 */
handleAddToFavourites = (joke) => {
    const { dispatch, favourites } = this.props;
      if(favourites.indexOf(joke) === -1){
        //add joke to the current array
       dispatch(addToFavorites(joke));
       dispatch(snackBarToogle());
      }
      else
      {
        //remove joke from current array
        dispatch(removeFromFavorites(joke.id));
        dispatch(snackBarToogle());
      }
  }

  messageToogle = (event, reason) => {
    const { dispatch } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    dispatch(snackBarToogle());
  };

  showMessages = (variant = 'success' || 'warning' || 'error' ||'info', message, vertical =  "top" | "center" | "bottom", horizontal = "left" | "center" | "right") => {
    const {snackbarOpen} = this.props;
    return (
      <AppSnackbar
        variant={variant}
        message={message}
        open={snackbarOpen}
        vertical={vertical}
        horizontal={horizontal}
        handleClose={this.messageToogle.bind(this)}
      />
    );
  }

  /**
   * Sort Categories into a Material UI List Component
   * @memberof App
   */
  setupCategories = () => {
    //isCategoriesFetching
    const isEmpty = this.props.categories.length === 0 || this.props.isCategoriesFetching;

    if (!isEmpty) {
      const listItems = this.props.categories.map((category, index, array) =>
        <ListItem button key={index} onClick={this.handleCategoryClick.bind(this, category)}>
          <ListItemText primary={this.capitalizeFirstLetter(category)} />
        </ListItem>
      );

      return (
        <div>{listItems}</div>
      );
    }
    else {
      return (<div>
        <ListItem>
          <ListItemText primary="Loading..." />
        </ListItem>
      </div>)
    }

  };

  /**
   * Capitalize the first letter in an char sequence
   * @memberof App
   */
  capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {this.setupCategories()}
        </List>
      </div>);

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Chuck Norris Jokes
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.props.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{paper: classes.drawerPaper,}}
            ModalProps={{keepMounted: true,}}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {!this.props.dialogOpen && <LinearQueryLoading isQueryLoading={this.props.isFetching} />}
          <div className={classes.root}>
            {this.props.selectedCategory &&
              <RandomJokeDialog
                open={this.props.dialogOpen}
                category={this.capitalizeFirstLetter(this.props.selectedCategory)}
                joke={this.props.dialogJoke}
                iconClass={classes.rightIcon}
                isLoading={this.props.isRandomFetching}
                onClose={this.handleDialogToogleDialog}
                onOpen={this.handleDialogToogleDialog}
                onLike={this.handleAddToFavourites.bind(this, this.props.dialogJoke)}
                onFetch={this.handleRefreshJoke.bind(this, this.props.selectedCategory)}/>}
              
            <Grid container spacing={24}
              alignItems='stretch'
              direction='row'
              justify='center'>
              {this.showMessages('info', 'Action Completed', "center", "center" )}
              <Grid item xs={12}>
                <SearchForm onChange={this.handleSearchTextOnChange} onSubmit={this.handleSearchOnSubmit} onHandleKeyPress={this.handleKeyPress.bind(this)}/>
              </Grid>
              <Grid item xs={12}>
                {this.props.searchResult.length !== 0 &&
                 <FullWidthGrid jokes={this.props.searchResult} isFetching={this.props.isFetching} addToFavourites={this.handleAddToFavourites}/>}
                {
                  this.props.favourites.length > 0 && 
                  this.props.searchResult.length === 0 && 
                  <FullWidthGrid isFev={'secondary'} jokes={this.props.favourites} addToFavourites={this.handleAddToFavourites}/>
                }
                 {
                  this.props.searchResult.length === 0 &&
                  this.props.favourites.length === 0 &&
                   <WelcomeGrid/>
                 }
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  isCategoriesFetching: PropTypes.bool.isRequired,
  searchResult: PropTypes.array.isRequired,
  favourites: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  mobileOpen: PropTypes.bool.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRandomFetching: PropTypes.bool.isRequired,
  dialogJoke: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {
    jokeCategories: { categories, isCategoriesFetching },
    jokeRequests: { searchResult, isFetching, isRandomFetching, dialogJoke, selectedCategory, searchText },
    jokesByFavouried: favourites,
    alium: {
      mobileOpen
    },
    jokeDialogToogle: { dialogOpen },
    appSnackBar: {snackbarOpen}
  } = state;

  console.log({
    categories,
    isCategoriesFetching,
    searchResult,
    favourites,
    selectedCategory,
    mobileOpen,
    dialogOpen,
    isRandomFetching,
    isFetching,
    dialogJoke,
    searchText,
    snackbarOpen
  });

  return {
    categories,
    isCategoriesFetching,
    searchResult,
    favourites,
    selectedCategory,
    mobileOpen,
    dialogOpen,
    isFetching,
    isRandomFetching,
    dialogJoke,
    searchText,
    snackbarOpen
  }
}

export default connect(mapStateToProps)(withRoot(withStyles(styles, { withTheme: true })(App)));
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
import SearchField from '../components/search.field';
import FullWidthGrid from '../components/layout.grid';
import LinearQueryLoading from '../components/query.loading';
import RandomJokeDialog from '../components/random.joke.dialog';
import {
  addToFavorites
//, removeFromFavorites
, fetchJokes
, fetchCategories
, fetchRandomJoke
, receiveJokeFailed
, switchCategory
//, cardCollapseToogle
//, shareJoke
, dialogOpen
, dialogClose
, mobileToogle } from '../actions/index'

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
   * Lifecycle Method
   * @memberof App
   */
  componentDidMount = () => {
    const { dispatch } = this.props;
    console.log('Component will mount');
    console.log(this.props);
    dispatch(fetchCategories());
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Component will receive props');
    if (nextProps.categories !== this.props.categories) {
      const { dispatch } = nextProps
      dispatch(fetchCategories());
    }
  }

  /**
   *Lifecycle Methods
   * @memberof App
   **/
  componentWillMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

/**
 * Lifecycle Method
 * @param {*} prevProps
 * @memberof App
 */
componentDidUpdate = (prevProps) => {
    if (this.props.categories !== prevProps.categories) {
      const { dispatch } = this.props
      dispatch(fetchCategories())
    }
  }

/**
 *Handle Drawer Toogle
 * @memberof App
 */
handleDrawerToggle = () => {
    //this.setprops({ mobileOpen: !this.props.mobileOpen });
    this.props.dispatch(mobileToogle());
  };

/**
 *Fired when the user types into the search box
 * @memberof App
 */
handleSearchOnChange = ((event) => {
    if (event.target.value) {
      this.props.dispatch(fetchJokes(event.target.value));
    } else {
      this.props.dispatch(receiveJokeFailed());
    }
  });

/**
 *Handle the opening of our joke dialog
 * @memberof App
 */
handleOpenDialog = () => {
    this.props.dispatch(dialogOpen())
  };

/**
 * Fired when our dialog is closed setting props to dialogOpen: false
 * @memberof App
 */
handleCloseDialog = () => {
    this.props.dispatch(dialogClose());
  };

  /**
   *Fired when the user refreshes the Joke
   * @memberof App
   */
  handleRefreshJoke = (category) => {
    this.props.dispatch(fetchRandomJoke(category));
  }
/**
 *Fired when the category list is clicked
 * @memberof App
 */
handleCategoryClick = (value) => {
    this.props.dispatch(switchCategory(value));
    this.props.dispatch(fetchRandomJoke(value));
  };

/**
 * Add joke to favourites
 * @memberof App
 */
handleAddToFavourites = (joke) => {
    this.props.dispatch(addToFavorites(joke));
  };

/**
 * Sort Categories into a Material UI List Component
 * @memberof App
 */
setupCategories = () => {

    const listItems = this.props.categories.map((category, index, array) =>
      <ListItem button key={index} onClick={this.handleCategoryClick.bind(this, category)}>
        <ListItemText primary={this.capitalizeFirstLetter(category)} />
      </ListItem>
    );

    return (
      <div>{listItems}</div>
    );

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
      </div>
    );

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
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
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
            <RandomJokeDialog
              open={this.props.dialogOpen}
              category={this.capitalizeFirstLetter(this.props.selectedCategory)}
              joke={this.props.dialogJoke}
              iconClass={classes.rightIcon}
              isLoading={this.props.isFetching}
              onClose={this.handleCloseDialog}
              onOpen={this.handleOpenDialog}
              onLike={this.handleAddToFavourites}
              onFetch={this.handleRefreshJoke(this.props.selectedCategory)} />
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <SearchField onChange={this.handleSearchOnChange.bind(this)} />
              </Grid>
              <Grid item xs={12}>
                {this.props.searchResult && <FullWidthGrid jokes={this.props.searchResult} />}
                {this.props.favourites && !this.props.searchResult && <FullWidthGrid isFev={'secondary'} jokes={this.props.favourites} />}
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
  searchResult: PropTypes.array.isRequired, 
  favourites: PropTypes.array.isRequired, 
  selectedCategory: PropTypes.string.isRequired, 
  mobileOpen: PropTypes.bool.isRequired, 
  dialogOpen: PropTypes.bool.isRequired, 
  isFetching: PropTypes.bool.isRequired, 
  dialogJoke: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired 
};

const mapStateToProps = (state) => {

  const { 
    categories, 
    searchResult, 
    favourites, 
    selectedCategory, 
    mobileOpen, 
    dialogOpen, 
    isFetching, 
    dialogJoke } = state
  return {
    categories, 
    searchResult, 
    favourites, 
    selectedCategory, 
    mobileOpen, 
    dialogOpen, 
    isFetching, 
    dialogJoke 
  }
}

export default connect(mapStateToProps)(withRoot(withStyles(styles, { withTheme: true })(App)));
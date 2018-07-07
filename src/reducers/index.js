import {combineReducers }from 'redux'

import {
  JOKE_FAVORITED, 
  JOKE_UNFAVORITED, 
  REQUEST_CATEGORIES_ASYNC, 
  RECEIVE_CATEGORIES_ASYNC, 
  REQUEST_JOKE_ASYNC, 
  REQUEST_JOKE_FAILED,
  RECEIVE_JOKE_ASYNC, 
  RECEIVE_RANDOM_JOKE_ASYNC, 
  //JOKE_EXPAND_TOOGLE, 
  SWITCH_CATEGORY, 
  SHARE_JOKE, 
  MOBILE_TOOGLE, 
  DIALOG_OPEN, 
  DIALOG_CLOSE
}from '../actions/index' 


const initialState =  {
  categories: [], 
  searchResult: [], 
  favourites: [], 
  selectedCategory: [], 
  mobileOpen: false, 
  dialogOpen: false, 
  isFetching: false, 
  dialogJoke: null,
  isDialogFetching: false,
  clipboardJoke: null
  }; 


/**
 * Returns the Favourites State {state.favourites}*
 * @param {*} [state=initialState.favourites]
 * @param {*} action
 * @returns
 */
const jokesByFavouried = (state = initialState.favourites, action) =>  {
  switch (action.type) {
    case JOKE_FAVORITED:
      return Object.assign( {}, state,  {
        favourites:[...state, action.payload]
      })
    case JOKE_UNFAVORITED:
      return Object.assign( {}, state,  {
        favourites:state.filter((joke) => joke !== action.payload)
      })
    default:
      return state
  }
}

/**
 *Returns Categories State {state.categories}*
 * @param {*} [state={isFetching: initialState.isFetching, categories: initialState.categories }]
 * @param {*} action
 * @returns
 */
const jokeCategories = (state = { isFetching: initialState.isFetching, categories: initialState.categories }, action) =>  {
  switch (action.type) {
    case REQUEST_CATEGORIES_ASYNC:
      return Object.assign( {}, state,  {
        isFetching:true, 
      })
    case RECEIVE_CATEGORIES_ASYNC:
      return Object.assign( {}, state,  {
        isFetching:false, 
        categories:action.payload
      })
    default:
      return state
  }
}
/**
 *Returns a piece of Jokes State {state.searchResult}*
 * @param {*} [state={isFetching: initislState.isFetching, searchResult: initialState.searchResult, selectedCategory: initialState.selectedCategory}]
 * @param {*} action
 * @returns
 */
const jokeRequests = (state = {isFetching: initislState.isFetching, searchResult: initialState.searchResult, selectedCategory: initialState.selectedCategory}, action) =>  {
  switch (action.type) {
    case REQUEST_JOKE_ASYNC:
      return Object.assign( {}, state,  {
        isFetching:true, 
        searchResult:[], 
        //selectedCategory:action.payload
      })
    case RECEIVE_JOKE_ASYNC:
      return Object.assign( {}, state,  {
        isFetching:false, 
        searchResult:action.payload
      })
    case RECEIVE_RANDOM_JOKE_ASYNC:
      return Object.assign( {}, state,  {
        isFetching:false, 
        dialogJoke:action.payload
      })
      case REQUEST_JOKE_FAILED:
      return Object.assign( {}, state,  {
        isFetching:false, 
        searchResult:null, 
      })
    default:
      return state
  }
}

const jokeDialogToogle = (state = {dialogOpen: initialState.dialogOpen, dialogJoke: initialState.dialogJoke}, action) =>  {
  switch (action.type) {
    case DIALOG_OPEN:
      return Object.assign( {}, state,  {
        dialogOpen:true
      })
    case DIALOG_CLOSE:
      return Object.assign( {}, state,  {
        dialogOpen:false, 
        dialogJoke:null
      })
    default:
      return state
  }
}

const otherReducers = (state = {mobileOpen: initialState.mobileOpen, selectedCategory: initialState.selectedCategory, clipboardJoke: initialState.clipboardJoke}, action) =>  {
  switch (action.type) {
    /*case JOKE_EXPAND_TOOGLE:
      return Object.assign( {}, state,  {
        cardExpanded: ! state.cardExpanded
      })*/
    case MOBILE_TOOGLE:
      return Object.assign( {}, state,  {
        mobileOpen: ! state.mobileOpen
      })
    case SWITCH_CATEGORY:
      return Object.assign( {}, state,  {
        selectedCategory:action.payload
      })
      case SHARE_JOKE:
      return Object.assign( {}, state,  {
        clipboardJoke : action.payload
      })
    default:
      return state
  }
}

const rootReducer = combineReducers( {
  jokesByFavouried, 
  jokeCategories, 
  jokeRequests, 
  jokeDialogToogle, 
  otherReducers
})

export default rootReducer
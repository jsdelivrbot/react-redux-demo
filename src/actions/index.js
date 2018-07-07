import fetch from 'cross-fetch'; 

export const JOKE_FAVORITED = 'JOKE_FAVORITED'; 
export const JOKE_UNFAVORITED = 'JOKE_UNFAVORITED'; 
export const REQUEST_CATEGORIES_ASYNC = 'REQUEST_CATEGORIES_ASYNC'; 
export const RECEIVE_CATEGORIES_ASYNC = 'RECEIVE_CATEGORIES_ASYNC'; 
export const REQUEST_JOKE_ASYNC = 'REQUEST_JOKE_ASYNC'; 
export const RECEIVE_RANDOM_JOKE_ASYNC = 'RECEIVE_RANDOM_JOKE_ASYNC';
export const REQUEST_JOKE_FAILED = 'REQUEST_JOKE_FAILED';
export const RECEIVE_JOKE_ASYNC = 'RECEIVE_JOKE_ASYNC'; 
export const JOKE_EXPAND_TOOGLE = "JOKE_EXPAND_TOOGLE"; 
export const SWITCH_CATEGORY = "SWITCH_CATEGORY"; 
export const SHARE_JOKE = "SHARE_JOKE"; 
export const MOBILE_TOOGLE = "MOBILE_TOOGLE"; 
export const DIALOG_OPEN = "DIALOG_OPEN"; 
export const DIALOG_CLOSE = "DIALOG_CLOSE"; 
/*
 * action creators
 */
export const addToFavorites = joke => ( {type:JOKE_FAVORITED, payload:joke }); 

export const removeFromFavorites = id => ( {type:JOKE_UNFAVORITED, payload:id }); 

export const requestJoke = (text) => ( {type:REQUEST_JOKE_ASYNC, payload:text }); 

export const receiveJoke = (json) => ( {
    type:RECEIVE_JOKE_ASYNC, 
    payload:json
  }
); 

export const receiveRandomJoke = (json) => ( {
  type:RECEIVE_RANDOM_JOKE_ASYNC, 
  payload:json
}
); 

export const fetchJokes = (text) =>  {
  return dispatch =>  {
    dispatch(requestJoke(text))
    return fetch(`https://api.chucknorris.io/jokes/search?query=${text}`)
.then(
      response => response.json(), 
      error => console.log('A fatal error occurred.', error))
      .then(data => 
        dispatch(receiveJoke(text, data))
      )
  }
}

export const fetchCategories = () =>  {
  return dispatch =>  {
    dispatch(requestCategories())
    return fetch(`https://api.chucknorris.io/jokes/categories`)
.then(response => response.json(), error => console.log('A fatal error occurred.', error))
      .then(data => {
        console.log(data);
        dispatch(receiveCategories(data));
      }
      )
  }
}

//export function fetchCategories(dispatch){return dispatch(getCategories())};

export const fetchRandomJoke = (category) =>  {
  return dispatch =>  {
    dispatch(requestJoke(category))
    return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
.then(response => response.json(), 
      error => console.log('A fatal error occurred.', error))
      .then(data =>  {
        dispatch(receiveRandomJoke(data)); 
        dispatch(dialogOpen()); 
        }
      )
  }
}

export const requestCategories = () => ( {type:REQUEST_CATEGORIES_ASYNC }); 

export const shouldFetchCategory = (category) =>  {
  return (dispatch, getState) =>  {
    if (getState().selectedCategory) {
      if (category !== getState.category) {
        return dispatch(fetchRandomJoke(category))
      }
    }
  }
}

export const switchCategory = (category) => ( {type:SWITCH_CATEGORY, payload:category }); 

export const receiveCategories = (data) => ( {type:RECEIVE_CATEGORIES_ASYNC, payload:data }); 

export const cardCollapseToogle = () => ( {type:JOKE_EXPAND_TOOGLE }); 

export const shareJoke = joke => ( {type:SHARE_JOKE, payload:joke }); 

export const dialogOpen = () => ( {type:DIALOG_OPEN }); 

export const dialogClose = () => ( {type:DIALOG_CLOSE }); 

export const mobileToogle = () => ( {type:MOBILE_TOOGLE}); 

export const receiveJokeFailed = () => ({type: REQUEST_JOKE_FAILED});
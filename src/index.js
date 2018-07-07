// Do this once before any other code in your app
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/root';

ReactDOM.render(<Root />, document.querySelector('#root'));

import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app';
import About from './components/About';
import Sample from './components/Sample';
import 'styles/index.scss';

const Routes = () => (
  <Router>
		<div>
      <Route exact path="/" component={App}/>
      <Route path="/about" component={About}/>
      <Route path="/sample" component={Sample}/>
		</div>
  </Router>
);

export default Routes;

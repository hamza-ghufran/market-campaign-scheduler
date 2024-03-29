import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import Routes from './routes';
import './assets/scss/index.scss';
import configureStore from './store/configureStore';
import 'react-perfect-scrollbar/dist/css/styles.css';

const store = configureStore();
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

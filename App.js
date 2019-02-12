import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import LoginForm  from './src/components/LoginForm';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAAhIGc9RYo_Sy6md_tq12wk6I_xWBRzxo',
      authDomain: 'authentication-ee7a6.firebaseapp.com',
      databaseURL: 'https://authentication-ee7a6.firebaseio.com',
      projectId: 'authentication-ee7a6',
      storageBucket: 'authentication-ee7a6.appspot.com',
      messagingSenderId: '206745767387'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

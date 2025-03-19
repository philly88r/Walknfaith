import React from 'react';
import { AppRegistry } from 'react-native-web';
import App from '../App';
import './fonts.css';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});

import React from 'react';
import { StackNavigator } from 'react-navigation';
import * as Pages from './Pages';

const Routes = StackNavigator(
  {
    Home: { screen: Pages.Home },
    Signup: { screen: Pages.Signup },
    Pin: { screen: Pages.Pin },
  },
  {
    headerMode: 'none'
  }
);

export default Routes;

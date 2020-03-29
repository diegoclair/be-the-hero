import React from 'react';
import { Text, View } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

import Router from './src/router';

export default function App() {
  return (
    <Router />
  );
}

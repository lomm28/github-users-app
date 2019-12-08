import React from 'react';

import AppNavigator from './navigation/AppNavigator';

import styles from './styles';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <div style={styles.container}>
      <AppNavigator />
    </div>
  );
};

export default App;

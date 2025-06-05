import React from 'react';
import {HomeScreen} from './src/modules/home';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <HomeScreen />;
    </Provider>
  );
}

export default App;

import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {OrderBook} from './components';

const HomeScreen: FC = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* OrderBook component would be used here */}
      <OrderBook />
    </SafeAreaView>
  );
};

export {HomeScreen};

import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {orderBookStyles} from '.';
import {useOrderBook} from '../../../../hooks';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAX_BAR_WIDTH = SCREEN_WIDTH * 0.5;

const OrderBook: React.FC = () => {
  const {bids, asks} = useOrderBook();

  const maxTotal = Math.max(
    ...[...bids, ...asks].map(order => order?.total || 1),
  );

  const renderRow = (i: number) => {
    const bid = bids[i] || {price: 0, total: 0};
    const ask = asks[i] || {price: 0, total: 0};

    const bidWidth = (bid.total / maxTotal) * MAX_BAR_WIDTH;
    const askWidth = (ask.total / maxTotal) * MAX_BAR_WIDTH;

    return (
      <View style={orderBookStyles.row} key={i}>
        {/* Buy Side (Green Bar - Center to Left) Note: this view is reversed */}
        <View style={orderBookStyles.buyColumn}>
          <View style={[orderBookStyles.depthBarBuy, {width: bidWidth}]} />
          <Text style={orderBookStyles.textRight}>{bid.price.toFixed(1)}</Text>
          <Text style={orderBookStyles.textLeft}>{bid.total.toFixed(2)}</Text>
        </View>

        {/* Sell Side (Red Bar - Center to Right) */}
        <View style={orderBookStyles.sellColumn}>
          <Text style={orderBookStyles.textLeft}>{ask.price.toFixed(1)}</Text>
          <Text style={orderBookStyles.textRight}>{ask.total.toFixed(2)}</Text>
          <View style={[orderBookStyles.depthBarSell, {width: askWidth}]} />
        </View>
      </View>
    );
  };

  return (
    <View style={orderBookStyles.container}>
      <Text style={orderBookStyles.title}>ORDER BOOK</Text>
      <View style={orderBookStyles.header}>
        <View style={orderBookStyles.headerSide}>
          <Text style={orderBookStyles.headerText}>TOTAL</Text>
          <Text style={orderBookStyles.headerText}>PRICE</Text>
        </View>
        <View style={orderBookStyles.headerSide}>
          <Text style={orderBookStyles.headerText}>PRICE</Text>
          <Text style={orderBookStyles.headerText}>TOTAL</Text>
        </View>
      </View>
      {[...Array(15)].map((_, i) => renderRow(i))}
    </View>
  );
};

export {OrderBook};

import {StyleSheet} from 'react-native';

export const orderBookStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0f1c2e',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerSide: {
    width: '50%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#aaa',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  buyColumn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  sellColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  textLeft: {
    color: '#fff',
    fontSize: 12,
    width: '50%',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  textRight: {
    color: '#fff',
    fontSize: 12,
    width: '50%',
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  depthBarBuy: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(0, 255, 0, 0.4)',
    right: 0,
    zIndex: -1,
  },
  depthBarSell: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    left: 0,
    zIndex: -1,
  },
});

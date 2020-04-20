import { StyleSheet } from 'react-native';

import Color from './Colors'

export const Toast = StyleSheet.create({
  error: {
    padding:10,
    backgroundColor: Color.errorBackground,
    alignItems: 'center',
    width: '80%'
  },
  notice: {
    padding:10,
    backgroundColor: Color.noticeBackground,
    alignItems:'center',
    width: '80%'
  },
  warning: {
    padding:10,
    backgroundColor: Color.warningBackground,
    alignItems:'center',
    width: '80%'
  },
});
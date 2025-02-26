/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  return <Basic />;
}

export const Basic = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{backgroundColor: 'red', flex: 1}} />
      <View
        style={{
          paddingTop: 10,
          height: 100,
          paddingHorizontal: 10,
          paddingBottom: 15,
        }}>
        <WebView
          source={{
            html: `<html><body><input placeholder="sdfsdfd" style="width:200px;height:40px;" /></body></html>`,
          }}
        />
      </View>
    </View>
  );
};

export default App;

/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {RichText, useEditorBridge} from '@10play/tentap-editor';
import React from 'react';
import {View} from 'react-native';

function App(): React.JSX.Element {
  return <Basic />;
}

export const Basic = () => {
  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: false,
    initialContent: 'Start editing!',
  });
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
        <RichText editor={editor} />
      </View>
    </View>
  );
};

export default App;

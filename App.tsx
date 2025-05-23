/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LegendListScreen from './ListScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="List" component={LegendListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const Home = () => {
  const navigation = useNavigation();
  const [enablePagination, setEnablePagination] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.settings}>
        <Text>Enable Pagination:</Text>
        <Switch
          value={enablePagination}
          onChange={event => setEnablePagination(event.nativeEvent.value)}
        />
      </View>
      <Button
        onPress={() =>
          navigation.navigate('List', {pagination: enablePagination})
        }
        title="Go to list"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  settings: {
    width: '100%',
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

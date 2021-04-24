import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ContextProvider from './context';
import {SCREENS} from './screens';
import {Provider as PaperProvider} from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const App = () => {
  return (
    <ContextProvider>
      <PaperProvider
        settings={{
          icon: props => <AwesomeIcon {...props} />,
        }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {SCREENS.map(screenProps => (
              <Stack.Screen key={screenProps.name} {...screenProps} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ContextProvider>
  );
};

export default App;

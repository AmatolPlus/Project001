import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/utils/theme';
import React from 'react';
import {LoginStack} from './src/routes';
import {options} from './src/utils/navigationConfig';
import {Provider} from 'react-redux';
import {store} from '@/services/store.config';

function App(): JSX.Element {
  const MainStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainStack.Navigator screenOptions={options}>
            <MainStack.Screen name="Login" component={LoginStack} />
          </MainStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;

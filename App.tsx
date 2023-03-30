import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/utils/theme';
import React from 'react';
import {LoginStack, TabStack} from './src/routes';
import {options} from './src/utils/navigationConfig';
import {Provider} from 'react-redux';
import {store} from '@/services/store.config';
import {Details, Edit} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import Launch from '@/screens/Launch';

function App(): JSX.Element {
  const MainStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainStack.Navigator screenOptions={options}>
            <MainStack.Screen name={ScreenNames.launch} component={Launch} />
            <MainStack.Screen
              name={ScreenNames.mainStack}
              component={TabStack}
            />
            <MainStack.Screen
              name={ScreenNames.loginStack}
              component={LoginStack}
            />
            <MainStack.Screen name={ScreenNames.details} component={Details} />
            <MainStack.Screen name={ScreenNames.edit} component={Edit} />
          </MainStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;

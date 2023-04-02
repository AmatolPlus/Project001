import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {theme} from './src/utils/theme';
import {LoginStack, TabStack} from './src/routes';
import {store} from '@/services/store.config';
import {Details, Edit} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';
import Launch from '@/screens/Launch';

const Header = () => (
  <AntDesign
    name="leftsquare"
    style={{marginRight: Spacing.s}}
    size={24}
    onPress={() => {
      //  navigation.goBack()
    }}
    color="black"
  />
);

function App(): JSX.Element {
  const MainStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen name={ScreenNames.launch} component={Launch} />
            <MainStack.Screen
              name={ScreenNames.mainStack}
              component={TabStack}
            />
            <MainStack.Screen
              name={ScreenNames.loginStack}
              component={LoginStack}
            />
            <MainStack.Screen
              options={{
                headerTitleStyle: {...Fonts.h1},
                headerLeft: Header,
              }}
              name={ScreenNames.details}
              component={Details}
            />
            <MainStack.Screen name={ScreenNames.edit} component={Edit} />
          </MainStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;

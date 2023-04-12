/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {theme} from './src/utils/theme';
import {LoginStack, TabStack} from './src/routes';
import {store} from '@/services/store.config';
import {ContestList, Details} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';
import {options} from '@/utils/navigationConfig';
import Launch from '@/screens/Launch/Launch';

const HeaderIcon = ({navigation}: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign
        name="leftsquare"
        style={{marginRight: Spacing.s}}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

function App(): JSX.Element {
  const MainStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen
              name={ScreenNames.launch}
              options={options}
              component={Launch}
            />
            <MainStack.Screen
              options={options}
              name={ScreenNames.mainStack}
              component={TabStack}
            />
            <MainStack.Screen
              options={options}
              name={ScreenNames.loginStack}
              component={LoginStack}
            />
            <MainStack.Screen
              options={({navigation, route}: any) => ({
                headerTitle: route?.params?.concept_name,
                headerTitleStyle: {...Fonts.h1},
                headerLeft: () => {
                  return <HeaderIcon navigation={navigation} />;
                },
              })}
              name={ScreenNames.details}
              component={Details}
            />
            <MainStack.Screen
              name={ScreenNames.contestList}
              component={ContestList}
              options={({navigation}) => ({
                headerTitle: 'Contests',
                headerTitleStyle: {...Fonts.h1},
                headerLeft: () => {
                  return <HeaderIcon navigation={navigation} />;
                },
              })}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;

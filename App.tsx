/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Provider as PaperProvider, Text} from 'react-native-paper';

import {theme} from './src/utils/theme';
import {LoginStack, TabStack} from './src/routes';
import {store} from '@/services/store.config';
import {ContestList, Launch, MorePosts, Details} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';
import {options} from '@/utils/navigationConfig';
import {checkForUpdate} from '@/utils/appUpdate';

const config = {
  screens: {
    [ScreenNames.details]: `${ScreenNames.details}/:id`,
  },
};

const linking = {
  prefixes: ['https://site.highfive.one/'],
  config,
};

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
  checkForUpdate();

  const MainStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}>
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
                headerTitleAlign: 'center',
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
            <MainStack.Screen
              name={ScreenNames.morePosts}
              component={MorePosts}
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

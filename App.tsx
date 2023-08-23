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
import {BorderRadius, Spacing} from '@/utils/constants';
import {options} from '@/utils/navigationConfig';
import {checkForUpdate} from '@/utils/appUpdate';
import {Colors} from '@/utils/colors';

const config = {
  screens: {
    [ScreenNames.details]: `${ScreenNames.details}/:id`,
  },
};

const linking = {
  prefixes: ['highfive://', 'https://site.highfive.one/'],
  config,
};

const HeaderIcon = ({navigation}: any) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.light,
        elevation: 10,
        display: 'flex',
        height: Spacing.xl * 1.5,
        width: Spacing.xl * 1.5,
        borderRadius: BorderRadius.l,
        alignItems: 'center',
        shadowColor: Colors.info,
        justifyContent: 'center',
      }}
      onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={24} color={Colors.info} />
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
          <MainStack.Navigator
            screenOptions={{
              headerTitleStyle: {color: Colors.info, ...Fonts.h1},
              headerShadowVisible: false,
            }}>
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
                headerStyle: {
                  backgroundColor: Colors.light,
                },
                headerTitle: route?.params?.concept_name,
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
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: Colors.light,
                },
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
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: Colors.light,
                },
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

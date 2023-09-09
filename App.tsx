/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {TouchableOpacity, LogBox} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Provider as PaperProvider, Text} from 'react-native-paper';

import {theme} from './src/utils/theme';
import {LoginStack, TabStack} from './src/routes';
import {store} from '@/services/store.config';
import {ContestList, Launch, MorePosts, Details} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts, fontSize} from '@/utils/fonts';
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
      className={
        'shadow-md bg-light h-9 w-9 rounded-full shadow-info justify-center items-center'
      }
      onPress={() => {
        if (navigation?.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate(ScreenNames.mainStack);
        }
      }}>
      <AntDesign name="arrowleft" size={24} color={Colors.info} />
    </TouchableOpacity>
  );
};

function App(): JSX.Element {
  checkForUpdate();
  LogBox.ignoreLogs(['Warning:']);
  const MainStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}>
          <MainStack.Navigator
            screenOptions={{
              animation: 'slide_from_right',
              presentation: 'modal',
              animationTypeForReplace: 'push',
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
              options={({navigation}: any) => ({
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  ...Fonts.h1,
                  fontSize: fontSize.h4,
                  color: Colors.info,
                },
                headerStyle: {
                  backgroundColor: Colors.light,
                },
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

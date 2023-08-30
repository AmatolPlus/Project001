import {View, Text} from 'react-native';
import React from 'react';

export default function ErrorPage({error, onReload}: any) {
  return (
    <View className="bg-primary flex-1 items-center justify-center">
      <Text className="font-sans-bold text-center text-danger text-xl">
        Something Went Wrong. Try Again Later
      </Text>
      <Text className="mt-4 text-lg font-sans">{error?.error}</Text>
      <Text onPress={onReload} className="mt-2  text-lg font-sans-bold">
        Retry
      </Text>
    </View>
  );
}

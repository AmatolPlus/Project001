import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

const Section = ({
  title,
  icon = <></>,
  children,
  style,
  containerStyles,
}: any) => {
  const styles = StyleSheet.create({
    container: {
      ...style,
      ...VerticalMargin('s'),
    },
    label: {
      color: Colors.dark,
      ...Fonts.h4,
      fontSize: fontSize.s1,
      textAlign: 'center',
    },
    labelContainer: {
      ...containerStyles,
      alignItems: 'center',
      flexDirection: 'row',
      gap: Spacing.xs,
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      padding: Spacing.xs,
      borderRadius: BorderRadius.xs,
      marginBottom: Spacing.s,
    },
  });
  return (
    <View style={styles.container}>
      {title ? (
        <View style={styles.labelContainer}>
          {icon}
          <Text style={styles.label}>{title}</Text>
        </View>
      ) : (
        <></>
      )}
      {children}
    </View>
  );
};

export default Section;

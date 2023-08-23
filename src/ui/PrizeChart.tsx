import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {DataTable, Portal} from 'react-native-paper';

import {IPrizeChart} from '@/types/PrizeChart';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {HorizontalMargin} from '@/utils/spacing';
import Modal from './Modal';
import Text from './Text';
import {width} from '@/utils/Dimension';

const PriceChart = ({data, isOpen, setClosed, members}: IPrizeChart) => {
  const renderRow = () => {
    if (data) {
      return Object.keys(data).map((item): any => {
        return (
          <DataTable.Row key={item}>
            <DataTable.Cell textStyle={styles.tableCell}>{item}</DataTable.Cell>
            <DataTable.Cell textStyle={styles.tableCell}>
              {data[item]}
            </DataTable.Cell>
          </DataTable.Row>
        );
      });
    }
    return <></>;
  };

  return (
    <Portal>
      <Modal
        onDismiss={() => setClosed(false)}
        contentContainerStyle={styles.modal}
        visible={isOpen}>
        <View style={styles.container}>
          <DataTable>
            <DataTable.Header
              style={{
                backgroundColor: Colors.info,
                borderRadius: BorderRadius.m,
              }}>
              <DataTable.Title textStyle={styles.tableTitle}>
                Members ({members})
              </DataTable.Title>
              <DataTable.Title textStyle={styles.tableTitle}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Colors.primary,
                    fontSize: 16,
                  }}
                  ellipsizeMode={'tail'}
                  numberOfLines={2}>
                  Amount Per Person
                </Text>
              </DataTable.Title>
            </DataTable.Header>

            {renderRow()}
          </DataTable>
          {/* <View style={styles.cardContentContainer}>
            <Section style={styles.termsHeaderContainer}>
              <Text style={styles.termsHeader}>
                Prizepool will depend on how many slots are filled
              </Text>
              <Text style={styles.termsBody}>{notes}</Text>
            </Section>
          </View> */}
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - Spacing.l,
    alignSelf: 'center',
    padding: Spacing.m,
  },
  modal: {
    backgroundColor: Colors.white,
    ...HorizontalMargin('m'),
    alignSelf: 'center',
    borderRadius: BorderRadius.m,
  },
  tableTitle: {
    ...Fonts.h4,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.primary,
  },
  tableCell: {...Fonts.h5},

  card: {
    padding: Spacing.l,
    display: 'flex',
    backgroundColor: Colors.info,
    flexDirection: 'row',
  },
  cardText: {
    ...Fonts.h3,
    color: Colors.white,
    fontSize: fontSize.h6,
    marginLeft: Spacing.s,
  },
  cardContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsHeaderContainer: {
    borderRadius: BorderRadius.m,
    backgroundColor: Colors.warning,
    padding: Spacing.s,
    width: '100%',
  },
  termsHeader: {...Fonts.h4, marginBottom: Spacing.s},
  termsBody: {...Fonts.sub1, color: Colors.dark},
});

export default memo(PriceChart);

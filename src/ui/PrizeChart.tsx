import {IPrizeChart} from '@/types/PrizeChart';
import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {HorizontalMargin} from '@/utils/spacing';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';
import {Card, DataTable, Portal} from 'react-native-paper';
import Modal from './Modal';
import Text from './Text';

const PriceChart = ({data, isOpen, setClosed}: IPrizeChart) => {
  const renderRow = () =>
    Object.keys(data).map((item): any => {
      return (
        <DataTable.Row key={item}>
          <DataTable.Cell textStyle={styles.tableCell}>{item}</DataTable.Cell>
          <DataTable.Cell textStyle={styles.tableCell}>
            {data[item]}
          </DataTable.Cell>
        </DataTable.Row>
      );
    });

  return (
    <Portal>
      <Modal
        onDismiss={() => setClosed(false)}
        contentContainerStyle={styles.modal}
        visible={isOpen}>
        <View style={styles.container}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text style={styles.tableTitle}>Position</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.tableTitle}>Price</Text>
              </DataTable.Title>
            </DataTable.Header>
            {renderRow()}
          </DataTable>
          <Card mode="contained" style={styles.card}>
            <Text style={styles.cardText}>Prize is distributed as above</Text>
          </Card>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - Spacing.l,
    alignSelf: 'center',
    padding: Spacing.m,
  },
  modal: {
    backgroundColor: Colors.white,
    ...HorizontalMargin('m'),
    alignSelf: 'center',
  },
  tableTitle: {...Fonts.h4},
  tableCell: {...Fonts.h5},

  card: {padding: Spacing.l, backgroundColor: Colors.info},
  cardText: {
    ...Fonts.h3,
    color: Colors.white,
    fontSize: fontSize.h6,
  },
});

export default memo(PriceChart);

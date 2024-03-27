// Receipt.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Receipt = () => {
  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.header}>Receipt</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.content}>March 26, 2024</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Merchant:</Text>
        <Text style={styles.content}>Example Mart</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total:</Text>
        <Text style={[styles.content, styles.total]}>$50.00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  receiptContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  content: {},
  total: {
    color: 'green',
  },
});

export default Receipt;

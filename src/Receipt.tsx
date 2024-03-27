// Receipt.tsx

import React, {useRef} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import ViewShot from 'react-native-view-shot'; // Import ViewShot component

const Receipt = ({
  onTakeScreenshot,
}: {
  onTakeScreenshot: (uri: string) => void;
}) => {
  const viewRef = useRef<ViewShot | null>(null); // Reference to ViewShot component

  const handleTakeScreenshot = async () => {
    try {
      if (viewRef.current && viewRef.current.capture) {
        const uri = await viewRef.current.capture(); // Capture screenshot
        onTakeScreenshot(uri); // Pass captured image URI to parent component
      }
    } catch (error) {
      console.error('Failed to capture screenshot: ', error);
    }
  };

  return (
    <View style={styles.receiptContainer}>
      <ViewShot ref={viewRef} style={styles.container}>
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
      </ViewShot>
      <Button title="Take Screenshot" onPress={handleTakeScreenshot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Container style with flex 1 to fill the screen
  },
  receiptContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color
    padding: 20,
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Increased margin bottom for separation
    textAlign: 'center', // Center text alignment
    color: '#333', // Header text color
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Increased margin bottom for separation
  },
  label: {
    fontWeight: 'bold',
    color: '#555', // Label text color
  },
  content: {
    color: '#222', // Content text color
  },
  total: {
    color: 'green',
    fontWeight: 'bold', // Bold text for total
  },
});

export default Receipt;

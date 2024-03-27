import React, {useRef, useState} from 'react';
import {
  View,
  Button,
  Image,
  Share,
  PermissionsAndroid,
  Platform,
  Text,
  StyleSheet,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Clipboard from '@react-native-community/clipboard';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const viewRef = useRef<ViewShot | null>(null);

  const takeScreenshot = async () => {
    try {
      if (viewRef.current && viewRef.current.capture) {
        const uri = await viewRef.current.capture();
        setImageUri(uri);
      }
    } catch (error) {
      console.error('Failed to capture screenshot: ', error);
    }
  };

  const shareScreenshot = async () => {
    try {
      if (imageUri) {
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
        }
        Clipboard.setString(imageUri);
        Share.share({
          message: 'Check out this screenshot!',
          url: imageUri,
        });
      }
    } catch (error) {
      console.error('Failed to share screenshot: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View style={styles.container}>
          <Image
            source={{uri: imageUri}}
            style={styles.container}
            resizeMode="contain"
          />
          <Button title="Share Screenshot" onPress={shareScreenshot} />
        </View>
      ) : (
        <>
          <ViewShot ref={viewRef} style={styles.container}>
            <Receipt />
          </ViewShot>
          <Button title="Take Screenshot" onPress={takeScreenshot} />
        </>
      )}
    </View>
  );
};

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
  container: {
    flex: 1,
  },
  receiptContainer: {
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

export default App;

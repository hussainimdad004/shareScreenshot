// App.tsx

import React, {useState} from 'react';
import {
  View,
  Image,
  Share,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Receipt from './src/Receipt'; // Import Receipt component
import Clipboard from '@react-native-community/clipboard';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null); // State to hold image URI

  const takeScreenshot = async (uri: string) => {
    try {
      setImageUri(uri); // Set captured image URI to state
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
          ); // Request permission to write to external storage (Android)
        }
        Clipboard.setString(imageUri); // Copy image URI to clipboard
        Share.share({
          message: 'Check out this screenshot!',
          url: imageUri, // Share the image URI
        });
      }
    } catch (error) {
      console.error('Failed to share screenshot: ', error);
    }
  };

  const resetState = () => {
    setImageUri(null); // Reset image URI state
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        // If image URI exists (i.e., screenshot captured)
        <View style={styles.shareScreenShotContainer}>
          <Image
            source={{uri: imageUri}}
            style={styles.image}
            resizeMode="contain" // Show captured image
          />
          <TouchableOpacity onPress={shareScreenshot} style={styles.button}>
            <Text style={styles.buttonText}>Share Screenshot</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetState} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // If no image URI (i.e., no screenshot captured)
        <Receipt onTakeScreenshot={takeScreenshot} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color
  },
  shareScreenShotContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 28,
    marginVertical: 28,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

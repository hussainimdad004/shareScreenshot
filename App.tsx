import React, {useRef, useState} from 'react';
import {
  View,
  Button,
  Image,
  Share,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Receipt from './src/Receipt';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;

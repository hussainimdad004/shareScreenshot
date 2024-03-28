import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface ReceiptProps {
  onTakeScreenshot: (uri: string) => void;
}

interface DataItemProps {
  firstEntry: string;
  secondEntry: string;
}

const DataItem: React.FC<DataItemProps> = ({firstEntry, secondEntry}) => (
  <View style={styles.dataItemStyle}>
    <Text style={styles.firstEntryText}>{firstEntry}</Text>
    <Text style={styles.secondEntryText}>{secondEntry}</Text>
  </View>
);

const Receipt: React.FC<ReceiptProps> = ({onTakeScreenshot}) => {
  const viewRef = useRef<ViewShot>(null);

  const handleTakeScreenshot = async () => {
    try {
      if (viewRef.current && viewRef.current.capture) {
        const uri = await viewRef.current.capture();
        onTakeScreenshot(uri);
      }
    } catch (error) {
      console.error('Failed to capture screenshot: ', error);
    }
  };

  return (
    <View style={styles.receiptContainer}>
      <View style={styles.headerContainer}>
        <FontAwesomeIcon name="check-square-o" size={40} color="#fff" />
        <Text style={styles.headerTitle}>Successful Transaction</Text>
      </View>
      <ViewShot ref={viewRef} style={styles.container}>
        <Text style={styles.transferToText}>Transfer to</Text>
        <View style={styles.transferToContainer}>
          <View style={styles.userDataContainer}>
            <Image
              source={{
                uri: 'https://source.unsplash.com/random/150x150/?pakistan',
              }}
              style={styles.image}
            />
            <View style={styles.nameAndPhoneContainer}>
              <Text style={styles.nameText}>Ryan Green</Text>
              <Text style={styles.phoneText}>(618) 878-1478</Text>
            </View>
          </View>
          <FontAwesomeIcon name="star-o" size={20} color="#91959f" />
        </View>
        <View style={styles.dataContainer}>
          <DataItem firstEntry="Amount" secondEntry="$1500" />
          <DataItem
            firstEntry="Transfer method"
            secondEntry="Transfer Wallet"
          />
          <DataItem firstEntry="Time" secondEntry="12:30 21/08/23" />
          <DataItem firstEntry="Transaction ID" secondEntry="56472" />
        </View>
      </ViewShot>
      <TouchableOpacity style={styles.button} onPress={handleTakeScreenshot}>
        <Text style={styles.buttonText}>Take Screenshot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#3363d5',
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 28,
  },
  transferToText: {
    textAlign: 'center',
    marginVertical: 8,
  },
  transferToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 20,
    borderColor: '#91959f',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  nameAndPhoneContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 12,
  },
  userDataContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 75,
    borderWidth: 0.1,
    borderColor: '#91959f',
  },
  receiptContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dataContainer: {
    marginTop: 10,
    borderColor: '#91959f',
    borderWidth: 0.5,
    borderRadius: 4,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  dataItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  firstEntryText: {
    color: '#91959f',
  },
  secondEntryText: {
    color: '#000',
  },
  button: {
    backgroundColor: '#3363d5',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 28,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Receipt;

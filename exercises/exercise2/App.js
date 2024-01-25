import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from './button';

export default function App() {
  return (
    <View style={styles.container}>
      <Button style={styles.btn}>
        My First Button
      </Button>
      <Button success style={styles.btn}>
        Success Button
      </Button>
      <Button info style={styles.btn}>
        Info Button
      </Button>
      <Button danger style={styles.btn} onPress={onPress}>
        Danger Button
      </Button>
      <Button danger rounded style={styles.btn} onPress={onPress}>
        Rounded Button
      </Button>
      <Button success children="Sample" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 10
  }
});

const onPress = () => {
  Alert.alert("Alert", "You pressed danger button");
}

import { StyleSheet, View, Text } from 'react-native';

export const App = () => {
  return (
    <View style={styles.container}>
      <Text>You're up and running</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;

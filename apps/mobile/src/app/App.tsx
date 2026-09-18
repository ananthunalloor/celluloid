import { StyleSheet, View, Text } from 'react-native';
import { Button, config, TamaguiProvider } from '@org/ui';

export const App = () => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <View style={styles.container}>
        <Button>hello</Button>
        <Text>You're up and running</Text>
      </View>
    </TamaguiProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;

import { Button, View } from "react-native";


export default function HomeScreen({navigation}: {navigation: any}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  }
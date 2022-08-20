import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function App() {
  return (
    <View style={tw`h-full w-full flex justify-center items-center`}>
      <Text style={tw`text-red-500`}>
        Open up App.js to start working on your app!
      </Text>
    </View>
  );
}

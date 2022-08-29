import React, { useMemo } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import PlacesCard from "../components/PlacesCard";
import { LatLng } from "react-native-maps";
import { useDismissKeyboard } from "../hooks/useDismissKeyboard";
import { useRecoilValue } from "recoil";
import { originState, destinationState } from "../states/Directions.state";

type Props = {};

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { onRelease, shouldSetResponse } = useDismissKeyboard();
  const origin = useRecoilValue(originState);
  const destination = useRecoilValue(destinationState);
  const ready = useMemo(() => {
    if (
      origin.latitude !== 0 &&
      origin.longitude !== 0 &&
      destination.latitude !== 0 &&
      destination.longitude !== 0
    ) {
      console.log("ready", origin, destination);
      return true;
    } else {
      return false;
    }
  }, [origin, destination]);
  return (
    <KeyboardAvoidingView behavior={"padding"} style={tw`h-full relative`}>
      <View
        onResponderRelease={onRelease}
        onStartShouldSetResponder={shouldSetResponse}
      >
        <Map />
      </View>
      {!ready && (
        <View style={tw`w-4/5 absolute top-16 left-6`}>
          <PlacesCard />
        </View>
      )}
      {ready && (
        <TouchableOpacity
          onPress={navigation.navigate("Results")}
          style={tw`absolute bottom-10 right-10 bg-blue-500 px-4 py-2 rounded-sm shadow-lg`}
        >
          <Text style={tw`text-lg text-white`}>Get your safe route</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

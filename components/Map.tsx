import React, { useRef, useEffect, useMemo } from "react";
import { TouchableOpacity, Text } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useRecoilState } from "recoil";
import {
  originStateSelector,
  destinationStateSelector,
} from "../states/Directions.state";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

type Props = {};

const Map = (props: Props) => {
  const [origin, setOrigin] = useRecoilState(originStateSelector);
  const [destination, setDestination] = useRecoilState(
    destinationStateSelector
  );
  // if all origin and destination coords are filled, we are ready to route
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

  // zoom to fit origin & destination
  const mapRef = useRef<MapView>(null);
  useEffect(() => {
    // console.log("zooming to ", origin, destination);
    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 190, bottom: 90, left: 90, right: 90 },
      animated: true,
    });
  }, [origin, destination]);

  useEffect(() => {
    console.log("ready? ", ready);
  }, [ready]);

  return (
    <MapView
      ref={mapRef}
      style={tw`h-full`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: 37.7804,
        longitude: -122.44516,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}
    >
      {origin.latitude !== 0 && (
        <Marker
          pinColor={"#FF796D"}
          coordinate={origin}
          identifier={"origin"}
        />
      )}
      {destination.latitude !== 0 && (
        <Marker
          pinColor={"#FF796D"}
          coordinate={destination}
          identifier={"destination"}
        />
      )}
    </MapView>
  );
};

export default Map;

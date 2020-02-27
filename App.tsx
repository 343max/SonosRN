import React, { useState, useCallback, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput
} from "react-native";
import { Search, Sonos } from "react-native-sonos";
import { useEventEmitter } from "./src/useEventEmitter";
import { Speaker, reduceSpeakers } from "./src/model/Speaker";
import SpeakerInfoView from "./src/components/SpeakerInfoView";

const search = new Search({ timeout: 60000 });

Sonos.prototype.id = function(): string {
  return `${this.host}:${this.port}`;
};

export default function App() {
  const [speakers, addSpeaker] = useReducer(
    reduceSpeakers,
    new Array<Speaker>()
  );
  useEventEmitter(search, "DeviceAvailable", sonos => addSpeaker(sonos));

  return (
    <SafeAreaView>
      <FlatList
        data={speakers}
        renderItem={({ item }) => <SpeakerInfoView speaker={item} />}
        keyExtractor={sonos => sonos.id()}
      />
    </SafeAreaView>
  );
}

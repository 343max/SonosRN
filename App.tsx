import React, { useReducer } from "react"
import { FlatList, SafeAreaView } from "react-native"
import { Sonos } from "react-native-sonos"
import SpeakerInfoView from "./src/components/SpeakerInfoView"
import { useSonosDeviceAvailable } from "./src/useSonosDeviceAvailable"
import { reduceSpeakers, initialState } from "./src/model/speakerReducer"

export default function App() {
  const [state, dispatch] = useReducer(reduceSpeakers, initialState)

  const addSpeaker = (sonos: Sonos) => {
    dispatch({ type: "AddSpeaker", sonos })
  }

  useSonosDeviceAvailable(addSpeaker)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={state.speakers
          .filter(s => s.online())
          .sort((a, b) => a.name().localeCompare(b.name()))}
        renderItem={({ item }) => <SpeakerInfoView speaker={item} />}
        keyExtractor={sonos => sonos.id()}
      />
    </SafeAreaView>
  )
}

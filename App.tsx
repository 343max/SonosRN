import React, { useReducer } from "react"
import { FlatList, SafeAreaView } from "react-native"
import { Sonos, Search } from "react-native-sonos"
import SpeakerInfoView from "./src/components/SpeakerInfoView"
import { useSonosDeviceAvailable } from "./src/useSonosDeviceAvailable"
import { reduceSpeakers, initialState } from "./src/model/speakerReducer"

const search = new Search({ timeout: 60000 })
export default function App() {
  const [state, dispatch] = useReducer(reduceSpeakers, initialState)

  const addSpeaker = (sonos: Sonos) => {
    dispatch({ type: "AddSonosSpeaker", sonos })
  }

  useSonosDeviceAvailable(search, addSpeaker)

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

import { Sonos } from "react-native-sonos"
import { Speaker, sonosId } from "./Speaker"

interface State {
  speakers: Speaker[]
}

type Action = {
  type: "AddSonosSpeaker"
  sonos: Sonos
}

export const initialState: State = { speakers: [] }

export const reduceSpeakers = (state: State, action: Action): State => {
  switch (action.type) {
    case "AddSonosSpeaker":
      const sonos = action.sonos
      const speakers = state.speakers
        .filter(item => item.id() != sonosId(sonos))
        .concat([new Speaker(sonos)])
      return { speakers }
    default:
      throw new Error(`Unknown Action`)
  }
  return state
}

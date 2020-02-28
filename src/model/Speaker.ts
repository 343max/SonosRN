import { Sonos } from "react-native-sonos"

export const sonosId = (sonos: Sonos) => `${sonos.host}:${sonos.port}`

export enum SpeakerState {
  Stopped = "stopped",
  Playing = "playing",
  Paused = "paused",
  Transitioning = "transitioning",
  NoMedia = "no_media"
}

export class Speaker {
  sonos: Sonos
  zoneAttributes?: any
  volume?: number
  iconURL?: string
  state?: SpeakerState

  constructor(sonos: Sonos) {
    this.sonos = sonos

    sonos.getZoneAttrs((error, zoneAttrs) => {
      this.zoneAttributes = zoneAttrs
    })

    sonos.getVolume((error, volume) => {
      if (error) {
        console.log(error)
      } else {
        this.volume = volume
      }
    })

    sonos.deviceDescription((error, deviceDescription) => {
      if (deviceDescription) {
        const icon = deviceDescription.iconList.icon[0].url[0]
        this.iconURL = `http://${this.sonos.host}:${this.sonos.port}${icon}`
      }
    })

    sonos.currentTrack((error, currentTrack) => {
      console.log(["currentTrack", error, currentTrack])
    })

    sonos.getCurrentState((error, currentState) => {
      this.state = currentState as SpeakerState
    })
  }

  online(): boolean {
    return this.zoneAttributes != null
  }

  id(): string {
    return sonosId(this.sonos)
  }

  name(): string {
    return this.zoneAttributes?.CurrentZoneName ?? this.id()
  }
}

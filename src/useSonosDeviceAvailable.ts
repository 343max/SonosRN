import { useEffect } from "react"
import { Search, Sonos } from "react-native-sonos"
import { EventEmitter } from "events"

type SonosDeviceAvailableFN = (sonos: Sonos) => void

export const useSonosDeviceAvailable = (fn: SonosDeviceAvailableFN) => {
  useEffect(() => {
    const search: EventEmitter = new Search({ timeout: 60000 })
    search.addListener("DeviceAvailable", fn)

    return () => {
      search.removeListener("DeviceAvailable", fn)
    }
  }, [fn])
}

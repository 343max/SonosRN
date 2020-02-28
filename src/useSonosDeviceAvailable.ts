import { useEffect } from "react"
import { Search, Sonos } from "react-native-sonos"

type SonosDeviceAvailableFN = (sonos: Sonos) => void

export const useSonosDeviceAvailable = (
  search: Search,
  fn: SonosDeviceAvailableFN
) => {
  useEffect(() => {
    search.addListener("DeviceAvailable", fn)

    return () => {
      search.removeListener("DeviceAvailable", fn)
    }
  }, [fn])
}

import React from "react"
import { Text, View, StyleProp, ViewStyle } from "react-native"
import { SpeakerState } from "../model/Speaker"
import { Ionicons } from "@expo/vector-icons"

interface PlayStateViewProps {
  state?: SpeakerState
  style?: StyleProp<ViewStyle>
  color?: string
}

export default function PlayStateView({
  state,
  style,
  color
}: PlayStateViewProps) {
  function Icon(state: SpeakerState) {
    switch (state) {
      case SpeakerState.Paused:
        return <Ionicons name="ios-pause" size={16} color={color} />
      case SpeakerState.Playing:
        return <Ionicons name="ios-play" size={16} color={color} />
      default:
        return null
    }
  }

  const icon = Icon(state)
  return icon != null ? <View style={style}>{icon}</View> : <View />
}

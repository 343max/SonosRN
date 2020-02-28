import React, { useState, useReducer } from "react"
import { Speaker } from "../model/Speaker"
import { View, Text, Image } from "react-native"
import Slider from "@react-native-community/slider"
import PlayStateView from "./PlayStateView"

interface SpeakerInfoViewProps {
  speaker: Speaker
}

export default function SpeakerInfoView({ speaker }: SpeakerInfoViewProps) {
  const volume = {
    value: speaker.volume ?? 0,
    disabled: speaker.volume === undefined
  }

  const image = speaker.iconURL ? (
    <Image
      source={{ uri: speaker.iconURL }}
      style={{ width: 60, height: 60 }}
    />
  ) : (
    <View style={{ width: 60, height: 60 }} />
  )

  const [currentVolume, setCurrentVolume] = useReducer(
    (
      currentVolume: number,
      { value, threshold }: { value: number; threshold: number }
    ) => {
      let newVolume = Math.round(value)

      if (Math.abs(value - currentVolume) < threshold) {
        return currentVolume
      }

      speaker.sonos.setVolume(newVolume, () => {})

      return newVolume
    },
    volume.value
  )

  if (volume.value && currentVolume == 0) {
    setCurrentVolume({ value: volume.value, threshold: 0 })
  }

  return (
    <View
      style={{
        margin: 5,
        padding: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        flex: 1,
        flexDirection: "row"
      }}
    >
      {image}
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <PlayStateView
            state={speaker.state}
            style={{ marginRight: 6 }}
            color="#aaa"
          />
          <Text>{speaker.name()}</Text>
        </View>
        <Slider
          disabled={volume.disabled}
          value={currentVolume}
          maximumValue={100}
          onValueChange={value =>
            setCurrentVolume({ value: value, threshold: 5 })
          }
          onSlidingComplete={value =>
            setCurrentVolume({ value: value, threshold: 0 })
          }
        />
      </View>
    </View>
  )
}

import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Button, View, Text} from 'react-native'
import * as Speech from 'expo-speech'
import {useEffect, useState} from 'react'

const text = `I couldn't wait for you to come and clear the cupboard
But now you're gone and leaving nothing but a sign
Another evening I'll be sitting reading in between your lines
Because I miss you all the time
`

export default function App() {
  const [totalVoices, setTotalVoices] = useState<Speech.Voice[]>([])
  const [voiceIndex, setVoiceIndex] = useState(0)
  useEffect(() => {
    const getVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync()
      setTotalVoices(voices)
    }

    getVoices()
  }, [])

  const speak = () => {
    Speech.stop()
    Speech.speak(text, {
      voice: totalVoices[voiceIndex].identifier
    })
    if (voiceIndex <= totalVoices.length) {
      setVoiceIndex(voiceIndex + 1)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Voice Name: {totalVoices[voiceIndex].name}</Text>
      <Text>Language: {totalVoices[voiceIndex].language}</Text>
      <Text>
        {voiceIndex} of {totalVoices.length}
      </Text>
      <Button title="Next Voice" onPress={speak} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    gap: 10
  }
})
//V: 21, 29, 31, 33, 40, 56

import { View, Text, Platform } from 'react-native'
import React from 'react'
import Header from '../../components/Home/header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import NoCourse from '../../components/Home/NoCourse'

export default function Home() {
  return (
    <SafeAreaView
      style={{
        padding: 25,
        paddingTop: Platform.OS === 'ios' && 45,
        flex: 1,
        backgroundColor: Colors.WHITE
      }}
    >
      <Header />
      <NoCourse />
    </SafeAreaView>
  )
}
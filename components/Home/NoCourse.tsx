import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../Shared/Button'
import { useRouter } from 'expo-router'

export default function NoCourse() {
  const router = useRouter()

  return (
    <View
      style={{
        marginTop: 40,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Image
        source={require('../../assets/images/book.png')}
        style={{
          width: 200,
          height: 200
        }}
      />

      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 24,
          textAlign: 'center'
        }}
      >You Don't Have Any Course</Text>

      <Button
        text="Create New Course"
        onPress={() => router.push('/addCourse')}
        loading={false}
      />

      <Button
        text="Explore exixting courses"
        type='outline'
        onPress={() => { }}
        loading={false}
      />
    </View>
  )
}
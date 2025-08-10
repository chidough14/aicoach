import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { PraticeOption } from '../../constants/Option'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PracticeSection() {
  const router = useRouter()
  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 25
        }}
      >Practice</Text>

      <FlatList
        data={PraticeOption}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            key={index} 
            style={{ flex: 1, margin: 5, aspectRatio: 1 }}
            onPress={() => router.push({
              pathname: '/practice/[type]',
              params: { type: item.name }
            })}
          >
            <Image
              source={item?.image}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 160,
                borderRadius: 15
              }}
            />

            <Text
              style={{
                position: 'absolute',
                fontSize: 15,
                padding: 15,
                fontFamily: 'outfit',
                color: Colors.WHITE
              }}
            >{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
import { View, Text, FlatList, SafeAreaView, Platform, ListRenderItemInfo } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function Chapters({ course }: any) {
  return (
    <View
      style={{
        padding: 20
      }}
    >
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Chapters</Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <View>
            <View>
              <Text>{ index + 1 }</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}



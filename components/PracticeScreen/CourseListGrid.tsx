import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function CourseListGrid({ courseList, option }: any) {
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{ padding: 20 }}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 15,
              backgroundColor: Colors.WHITE,
              margin: 7,
              borderRadius: 15,
              elevation: 1
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.GRAY}
              style={{
                position: 'absolute',
                top: 10,
                right: 20
              }}
            />
            <Image
              source={option?.icon}
              style={{ width: '100%', height: 70, objectFit: 'contain' }}
            />

            <Text
              style={{
                fontFamily: 'outfit',
                textAlign: 'center',
                marginTop: 7
              }}>{item.courseTitle}</Text>
          </View>
        )}
      />
    </View>
  )
}
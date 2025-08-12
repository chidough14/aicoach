import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

export default function CourseListGrid({ courseList, option }: any) {
  const router = useRouter()

  const onPress = (course) => {
    if (option.name == 'Quiz') {
      router.push({
        pathname: '/quiz',
        params: {
          courseParams: JSON.stringify(course)
        }
      })
    } else if (option.name == 'Flashcards') {
      router.push({
        pathname: '/flashcards',
        params: {
          courseParams: JSON.stringify(course)
        }
      })
    }
  }

  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{ padding: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(item)}
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
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
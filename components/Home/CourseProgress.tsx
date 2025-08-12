import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors'
import * as Progress from 'react-native-progress';
import CourseProgressCard from '../Shared/CourseProgressCard';

export default function CourseProgress({ courseList }: any) {
  // console.log("courseList",courseList)
  // const getCompletedChapters = (course) => {
  //   console.log(course?.completedChapter)
  //   const completedChapter = course?.completedChapter?.length
  //   const perc = completedChapter / course?.chapters?.length

  //   return perc
  // }


  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
        color: Colors.WHITE
      }}>Progress</Text>

      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <CourseProgressCard
              item={item}
            />
          </View>
        )}
      />
    </View>
  )
}
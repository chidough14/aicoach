import { View, Text, Image } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors';

export default function CourseProgressCard({ item, width = 280 }: any) {
  const getCompletedChapters = (course) => {
    // console.log("completedChapte",course?.completedChapter)
    const completedCount = course?.completedChapter?.length ?? 0;
    const totalCount = course?.chapters?.length ?? 1; // avoid divide by 0

    return completedCount / totalCount;
  };

  return (
    <View
      // key={index}
      style={{
        margin: 7,
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        width: width
      }}
    >
      <View
        style={{
          display: 'flex',
          gap: 8,
          flexDirection: 'row'
        }}
      >
        <Image
          source={imageAssets[item.banner_image]}
          style={{
            width: 80,
            height: 80,
            borderRadius: 8
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: 'outfit-bold',
              fontSize: 17,
              flexWrap: 'wrap',
            }}
          >
            {item?.courseTitle}
          </Text>
          <Text
            style={{
              fontFamily: 'outfit',
              fontSize: 15
            }}
          >
            {item?.chapters?.length} Chapters
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10
        }}
      >
        <Progress.Bar progress={getCompletedChapters(item)} width={width - 30} />
        <Text
          style={{
            fontFamily: 'outfit',
            marginTop: 2
          }}
        >{item?.completedChapter?.length || 0} out of {item?.chapters?.length}  Chapters Compketed</Text>
      </View>


    </View>
  )
}
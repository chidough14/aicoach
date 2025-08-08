import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors'
import * as Progress from 'react-native-progress';

export default function CourseProgress({ courseList }: any) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Progress</Text>

      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              margin: 7,
              padding: 15,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 15,
              width: 250
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
              <Progress.Bar progress={0} width={230} />
              <Text
                style={{
                  fontFamily: 'outfit',
                  marginTop: 2
                }}
              >3 out of 5 Chapters Compketed</Text>
            </View>


          </View>
        )}
      />
    </View>
  )
}
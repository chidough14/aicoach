import { View, Text, Image, Pressable, FlatList, Dimensions, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import FlipCard from 'react-native-flip-card'
import * as Progress from 'react-native-progress'

export default function FlashCards() {
  const { courseParams } = useLocalSearchParams()
  const course = JSON.parse(Array.isArray(courseParams) ? courseParams[0] : courseParams || '{}')
  const flashcards = course.flashcards
  const [currentPage, setCurrentPage] = useState(0)
  const width = Dimensions.get('screen').width

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width)

    setCurrentPage(index)
  }

  const getProgress = (currentPage) => {
    const perc = (currentPage / flashcards?.length)
    return perc
  }

  return (
    <View>
      <Image
        source={require('../../assets/images/wave.png')}
        style={{ width: '100%', height: 800 }}
      />

      <View
        style={{ padding: 25, width: '100%', position: 'absolute' }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Pressable>
            <Ionicons
              name="arrow-back"
              size={28}
              color="white"
            />
          </Pressable>

          <Text
            style={{ fontFamily: 'outfit-bold', fontSize: 25, color: Colors.WHITE }}
          >{currentPage + 1} of {flashcards?.length}</Text>
        </View>

        <View
          style={{
            marginTop: 10
          }}
        >
          <Progress.Bar
            progress={getProgress(currentPage + 1)}
            width={Dimensions.get('window').width * 0.85}
            color={Colors.WHITE}
            height={10}
          />
        </View>

        <FlatList
          data={flashcards}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => onScroll(e)}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                height: 500,
                marginTop: 60
                // backgroundColor: Colors.WHITE,
                // width: width * 0.9,
                // marginHorizontal: width * 0.09
              }}
            >
              <FlipCard style={styles.flipCard}>
                {/* Face Side */}
                <View style={styles.face}>
                  <Text style={{ fontFamily: 'outfit-bold', fontSize: 28, padding: 20, }}>{item?.front}</Text>
                </View>
                {/* Back Side */}
                <View style={styles.back}>
                  <Text
                    style={{
                      fontFamily: 'outfit',
                      fontSize: 28,
                      width: Dimensions.get('screen').width * 0.78,
                      padding: 20,
                      textAlign: 'center',
                      color: Colors.WHITE
                    }}
                  >{item?.back}</Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  back: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
  flipCard: {
    width: Dimensions.get('screen').width * 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: Dimensions.get('screen').width * 0.05
  },
  face: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 20,
  }
})
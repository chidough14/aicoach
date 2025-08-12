import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'

export default function QuestionAnswer() {
  const { courseParams } = useLocalSearchParams()
  const course = JSON.parse(Array.isArray(courseParams) ? courseParams[0] : courseParams || '{}')
  const qaList = course?.qa
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const onQuestionSelect = (index) => {
    if (selectedQuestion == index) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(index)
    }
  }

  return (
    <View>
      <Image
        source={require('../../assets/images/wave.png')}
        style={{ width: '100%', height: 800 }}
      />

      <View
        style={{ position: 'absolute', padding: 25, width: "100%", marginTop: 35 }}
      >
        <Text
          style={{ fontFamily: 'outfit-bold', fontSize: 28, color: Colors.WHITE }}
        >Questions & Answers</Text>

        <Text
          style={{ fontFamily: 'outfit', fontSize: 20, color: Colors.WHITE }}
        >{course?.courseTitle}</Text>

        <FlatList
          data={qaList}
          // numColumns={2}
          // style={{ padding: 20 }}
          renderItem={({ item, index }) => (
            <Pressable 
              style={styles.card} 
              onPress={() => onQuestionSelect(index)}
            >
              <Text
                style={{ fontFamily: 'outfit-bold', fontSize: 20 }}
              >{item?.question}</Text>


              {
                selectedQuestion == index && (
                  <View style={{ borderTopWidth: 1, marginVertical: 10 }}>
                    <Text 
                      style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GREEN, marginBottom: 10 }}
                    >
                        Answer: {item?.answer}
                    </Text>
                  </View>
                )
              }
            </Pressable>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 6,
    borderRadius: 15,
    elevation: 1
  }
})
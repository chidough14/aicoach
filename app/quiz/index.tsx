import { View, Text, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import * as Progress from 'react-native-progress'
import Button from '../../components/Shared/Button'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export default function Quiz() {
  const { courseParams } = useLocalSearchParams()
  const course = JSON.parse(Array.isArray(courseParams) ? courseParams[0] : courseParams || '{}')
  const quiz = course?.quiz
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getProgress = (currentPage) => {
    const perc = (currentPage / quiz?.length)
    return perc
  }

  const onOptionSelect = (choice) => {
    setResult(prev => ({
      ...prev,
      [currentPage]: {
        userChoice: choice,
        isCorrect: quiz[currentPage]?.correctAns == choice,
        question: quiz[currentPage]?.question,
        correctAns: quiz[currentPage]?.correctAns
      }
    }))
  }

  // useEffect(() => {
  //   console.log(result)
  // }, [result])

  const onQuizFinish = async () => {
    setLoading(true)

    try {
      await updateDoc(doc(db, 'Courses', course.docId), {
        quizResult: result
      })

      router.replace({
        pathname: '/quiz/summary',
        params: {
          quizResultParam: JSON.stringify(result)
        }
      })
    } catch (error) {

    }

    setLoading(false)
  }

  return (
    <View>
      <Image
        source={require('../../assets/images/wave.png')}
        style={{ width: '100%', height: 800 }}
      />

      <View
        style={{ position: 'absolute', padding: 25, width: "100%" }}
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
            // style={{
            //   position: 'absolute',
            //   top: 10,
            //   right: 20
            // }}
            />
          </Pressable>

          <Text
            style={{ fontFamily: 'outfit-bold', fontSize: 25, color: Colors.WHITE }}
          >{currentPage + 1} of {quiz?.length}</Text>
        </View>

        <View
          style={{
            marginTop: 10
          }}
        >
          <Progress.Bar
            progress={getProgress(currentPage)}
            width={Dimensions.get('window').width * 0.85}
            color={Colors.WHITE}
            height={10}
          />
        </View>

        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            marginTop: 30,
            // height: Dimensions.get('screen').height * 0.65,
            elevation: 1,
            borderRadius: 20
          }}
        >
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, textAlign: 'center' }}>{quiz[currentPage]?.question}</Text>
          {
            quiz[currentPage]?.options.map((item, index) => {

              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedOption(index)
                    onOptionSelect(item)
                  }}
                  style={{
                    padding: 20,
                    borderWidth: 1,
                    borderRadius: 15,
                    marginTop: 8,
                    borderColor: selectedOption == index ? Colors.GREEN : null,
                    backgroundColor: selectedOption == index ? Colors.LIGHT_GREEN : null
                  }}
                  key={index}
                >
                  <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>
                    {typeof item === 'string' ? item : String(item ?? '')}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </View>

        {
          (selectedOption?.toString() && quiz.length - 1 > currentPage) && (
            <Button
              text='Next'
              loading={false}
              onPress={() => {
                setCurrentPage(currentPage + 1)
                setSelectedOption(null)
              }}
            />
          )
        }

        {
          (selectedOption?.toString() && quiz.length - 1 == currentPage) && (
            <Button
              text='Finish'
              loading={loading}
              onPress={() => onQuizFinish()}
            />
          )
        }

      </View>
    </View>
  )
}

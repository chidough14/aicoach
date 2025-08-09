import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Progress from 'react-native-progress'
import Colors from '../../constants/Colors'
import Button from '../../components/Shared/Button'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export default function ChapterView() {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams()
  const chapters = JSON.parse(Array.isArray(chapterParams) ? chapterParams[0] : chapterParams || '{}')
  // console.log(typeof chapters, docId)
  const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

  const getProgress = (currentPage) => {
    const perc = (currentPage / chapters?.content?.length)

    return perc
  }

  const onChapterComplete = async () => {
    setLoading(true)
    await updateDoc(doc(db, 'Courses', Array.isArray(docId) ? docId[0] : docId), {
      completedChapter: arrayUnion(chapterIndex)
    })

     setLoading(false)
     router.replace({
       pathname: '/courseView/[courseId]',
       params: { courseId: Array.isArray(docId) ? docId[0] : docId }
     })
  }

  return (
    <ScrollView>
      <View
        style={{ padding: 25, backgroundColor: Colors.WHITE, flex: 1 }}
      >
        <Progress.Bar progress={getProgress(currentPage)} width={Dimensions.get('screen').width * 0.85} />

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'outfit-bold',
              fontSize: 25
            }}
          >
            {chapters?.content[currentPage].topic}
          </Text>

          <Text
            style={{
              fontFamily: 'outfit',
              fontSize: 20,
              marginTop: 7
            }}
          >
            {chapters?.content[currentPage].explain}
          </Text>

          {chapters?.content[currentPage].code &&
            <Text
              style={[styles.codeExample, { backgroundColor: Colors.BLACK, color: 'white', marginTop: 15 }]}
            >
              {chapters?.content[currentPage].code}
            </Text>}

          {
            chapters?.content[currentPage].example &&
            <>
              <Text style={{ fontFamily: 'outfit-bold', marginTop: 10 }}>Example</Text>
              <Text
                style={[styles.codeExample, { marginTop: 10 }]}
              >
                {chapters?.content[currentPage].example}
              </Text>
            </>
          }
        </View>

        <View
          style={{
            // position: 'absolute',
            // bottom: 15,
            // width: '100%',
            // left: 25
          }}
        >

          {
            chapters?.content?.length - 1 != currentPage ? (
              <Button
                text='Next'
                onPress={() => setCurrentPage(currentPage + 1)}
                loading={false}
              />
            ) : (
              <Button
                text='Finish'
                onPress={() => onChapterComplete()}
                loading={loading}
              />
            )
          }

        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  codeExample: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: 'outfit',
    fontSize: 18,
  }
})
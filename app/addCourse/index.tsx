import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../../constants/Colors'
import Button from '../../components/Shared/Button'
import { generateCoursesFromTopics, getGeminiResponse } from '../../config/Gemini'
import Prompt from '../../constants/Prompt'
import { extractJson, extractJsonArray } from '../../lib/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { UserDetailContext } from '../../context/UserDetailContext'
import { useRouter } from 'expo-router'

export default function AddCourse() {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('');
  const [response, setResponse] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const router = useRouter()

  const onGenerateTopic = async () => {
    setLoading(true);
    const result = await getGeminiResponse(input + Prompt.IDEA);

    const parsedArray = extractJsonArray(result); // <== clean & parse
    console.log("parsedArray", parsedArray);

    setResponse(parsedArray);
    setLoading(false);
  }

  const onTopicSelect = (topic) => {
    const alreadyExists = selectedTopic.find((item) => item == topic)

    if (!alreadyExists) {
      setSelectedTopic((prev) => [...prev, topic])
    } else {
      const topics = selectedTopic.filter((item) => item !== topic)
      setSelectedTopic(topics)
    }
  }

  const isTopicSelected = (topic) => {
    const alreadyExists = selectedTopic.find((item) => item == topic)
    return alreadyExists ? true : false
  }

  const onGenerateCourse = async () => {
    setLoading(true);

    // const prompt = [Prompt.COURSE, ...selectedTopic];

    try {
      const rawResponse = await generateCoursesFromTopics(selectedTopic);

      const parsed = extractJson(rawResponse);


      if (parsed) {
        console.log("🟢 Parsed JSON:", parsed);
        // You can now store parsed.courses
        parsed.courses.forEach(async (course) => {
          const docId = Date.now().toString()
          await setDoc(doc(db, 'Courses', docId), {
            ...course,
            createdOn: new Date(),
            createdBy: userDetail?.email,
            docId: docId
          })
        })

        router.push('/(tabs)/home')
      } else {
        console.warn("⚠️ Could not parse response. Raw:", rawResponse);
      }

      setLoading(false);
    } catch (error) {
        console.log("onGenerateCourse error", error)
    }

  };

  return (
    <SafeAreaView
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1
      }}
    >
      <ScrollView
        contentContainerStyle={{
          // padding: 25,
          paddingBottom: 100, // Add space for the last button
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 30
          }}
        >Create New Course</Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 24
          }}
        >What do you want to learn today?</Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            marginTop: 8,
            color: Colors.GRAY
          }}
        >What course do you want to create (ex. Learn Python, Digital Marketing etc...)</Text>

        <TextInput
          placeholder='Ex. Learn Python, Digital Marketing'
          style={styles.textInput}
          numberOfLines={3}
          multiline={true}
          onChangeText={(value) => setInput(value)}
        />

        <Button
          text="Generate Topic"
          type='outline'
          onPress={onGenerateTopic}
          loading={loading}
        />

        <View style={{ marginTop: 15, marginBottom: 10 }}>
          <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>Select all topics that you want to add in the course</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 6
            }}>
            {response.map((title, index) => (
              <Pressable
                key={index}
                onPress={() => onTopicSelect(title)}
              >
                <Text
                  key={index}
                  style={{
                    padding: 7,
                    borderWidth: 0.4,
                    borderRadius: 99,
                    paddingHorizontal: 15,
                    backgroundColor: isTopicSelected(title) ? Colors.PRIMARY : null,
                    color: isTopicSelected(title) ? Colors.WHITE : Colors.PRIMARY

                  }}
                >{title}</Text>
              </Pressable>

            ))}
          </View>
        </View>

        {selectedTopic.length > 0 &&
          <Button
            text='Generate Course'
            onPress={() => onGenerateCourse()}
            loading={loading}
          />}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: 'flex-start',
    fontSize: 18
  }
})
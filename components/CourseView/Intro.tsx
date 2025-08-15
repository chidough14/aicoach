import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { imageAssets } from '../../constants/Option'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import Button from '../Shared/Button'
import { useRouter } from 'expo-router'
// import { extractJson } from '../../lib/utils'
import { UserDetailContext } from '../../context/UserDetailContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export default function Intro({ course, enroll }: any) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  const handlePress = async () => {

  }

  const data = {
    ...course,
    createdBy: userDetail?.email,
    createdOn: new Date(),
    enrolled: true
  }

  const onEnrollCourse = async () => {
    const docId = Date.now().toString()

    setLoading(true)
    await setDoc(doc(db, 'Courses', docId), data)
    console.log("Finished")
    router.push({
      pathname: '/courseView/[courseId]',
      params: {
        courseId: docId,
        courseParams: JSON.stringify(data),
        enroll: 'false'
      }
    })

    setLoading(false)
  }

  return (
    <View>
      {/* <Pressable style={{position: 'absolute'}}>
        <Ionicons name="arrow-back" size={24} />
      </Pressable> */}

      <Image
        source={imageAssets[course?.banner_image]}
        style={{
          width: '100%',
          height: 280
        }}
      />

      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>{course?.courseTitle}</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginTop: 5
          }}
        >
          <Ionicons name='book-outline' size={24} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: 'outfit', color: Colors.PRIMARY }}>{course?.chapters?.length} Chapters</Text>
        </View>

        <Text style={{ fontFamily: 'outfit-bold', fontSize: 18, marginTop: 10 }}>Description:</Text>

        <Text style={{ fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>{course?.description}</Text>

        {
          enroll == 'true' ? (
            <Button
              text='Enroll'
              onPress={() => onEnrollCourse()}
              loading={loading}
            />
          ) : (
            <Button
              text='Start Now'
              onPress={() => { }}
              loading={loading}
            />
          )
        }

      </View>

      <Pressable
        style={{ position: 'absolute', padding: 10, marginTop: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} />
      </Pressable>
    </View>
  )
}
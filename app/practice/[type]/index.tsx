import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { PraticeOption } from '../../../constants/Option'
import Colors from '../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { UserDetailContext } from '../../../context/UserDetailContext'
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid'

export default function PracticeTypeHomeScreen() {
  const { type } = useLocalSearchParams()
  const option = PraticeOption.find((item) => item.name == type)
  const router = useRouter()
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const [loading, setLoading] = useState(false)
  const [courseList, setCourseList] = useState([])


  useEffect(() => {
    userDetail && getCourseList()
  }, [userDetail])

  const getCourseList = async () => {
    setLoading(true)
    setCourseList([])

    try {
      const q = query(
        collection(db, 'Courses'),
        where('createdBy', '==', userDetail?.email),
        orderBy('createdOn', 'desc')
      )

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        console.log("doc.data()", typeof doc.data())
        setCourseList(prev => [...prev, doc.data()])
      })
    } catch (error) {
       console.log(error)
    }

    setLoading(false)
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Image
        source={option.image}
        style={{
          height: 200,
          width: '100%'
        }}
      />

      <View
        style={{
          position: 'absolute',
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center'
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={"black"}
            style={{
              backgroundColor: Colors.WHITE,
              padding: 8,
              borderRadius: 10
            }}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
            color: Colors.WHITE
          }}
        >
          {type}
        </Text>
      </View>
      {loading && <ActivityIndicator size={28} color={Colors.PRIMARY} style={{ marginTop: 150 }} />}

      <CourseListGrid
        courseList={courseList}
        option={option}
      />
    </View>
  )
} 
import { View, Text, Platform, FlatList, ListRenderItemInfo } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Home/header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import NoCourse from '../../components/Home/NoCourse'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { UserDetailContext } from '../../context/UserDetailContext'
import { useRouter } from 'expo-router'
import CourseList from '../../components/Home/CourseList'
import PracticeSection from '../../components/Home/PracticeSection'
import CourseProgress from '../../components/Home/CourseProgress'

export default function Home() {
  const [courseList, setCourseList] = useState([])
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const router = useRouter()

  // const getCourseList = async () => {
  //   setCourseList([])
  //   const q = query(collection(db, 'Courses'), where("createdBy", "==", userDetail?.email))
  //   const querySnapshot = await getDocs(q)

  //   const courses = querySnapshot.docs.map((doc) => doc.data())
  //   setCourseList(courses)
  // }

  const getCourseList = async () => {
    const q = query(collection(db, 'Courses'), where("createdBy", "==", userDetail?.email))
    const querySnapshot = await getDocs(q)

    const fetchedCourses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Remove duplicates based on 'id'
    setCourseList((prevCourses) => {
      const existingIds = new Set(prevCourses.map(course => course.id))
      const newCourses = fetchedCourses.filter(course => !existingIds.has(course.id))
      return [...prevCourses, ...newCourses]
    })
  }


  useEffect(() => {
    userDetail && getCourseList()
  }, [userDetail])

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <SafeAreaView
          style={{
            padding: 25,
            paddingTop: (Platform.OS === 'ios' || Platform.OS === 'web') && 45,
            flex: 1,
            backgroundColor: Colors.WHITE
          }}
        >
          <Header />
          {courseList?.length === 0 ?
            <NoCourse /> :
            <View>
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
            </View>}
        </SafeAreaView>
      }
      renderItem={function (info: ListRenderItemInfo<any>): React.ReactElement | null {
        throw new Error('Function not implemented.')
      }}
    />

  )
}
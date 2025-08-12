import { View, Text, Platform, FlatList, ListRenderItemInfo, Image } from 'react-native'
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
  const [loading, setLoading] = useState(false)
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const router = useRouter()

  const getCourseList = async () => {
    setLoading(true)
    const q = query(collection(db, 'Courses'), where("createdBy", "==", userDetail?.email))
    const querySnapshot = await getDocs(q)

    const fetchedCourses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setCourseList(fetchedCourses)

    // Remove duplicates based on 'id'
    // setCourseList((prevCourses) => {
    //   const updatedCourses = fetchedCourses.map(fc => {
    //     const existing = prevCourses.find(pc => pc.id === fc.id)
    //     return existing ? { ...existing, ...fc } : fc
    //   })

    //   // Optionally merge with old ones not in fetched list
    //   const notFetched = prevCourses.filter(pc => !fetchedCourses.some(fc => fc.id === pc.id))

    //   return [...updatedCourses, ...notFetched]
    // })

    setLoading(false)
  }


  useEffect(() => {
    userDetail && getCourseList()
  }, [userDetail])

  return (
    <FlatList
      data={[]}
      onRefresh={() => getCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <SafeAreaView
          style={{
            padding: 25,
            paddingTop: (Platform.OS === 'ios' || Platform.OS === 'web') && 45,
            flex: 1,
            backgroundColor: Colors.WHITE
          }}
        >
          
            <Image
              source={require('../../assets/images/wave.png')}
              style={{position: 'absolute'}}
            />
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
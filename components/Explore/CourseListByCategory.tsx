import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { imageAssets } from '../../constants/Option'
import { useRouter } from 'expo-router'
import CourseList from '../Home/CourseList'

const CourseListByCategory = ({ category }: any) => {
  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getCourseListByCategory()
  }, [])

  const getCourseListByCategory = async () => {
    setLoading(true)
    const q = query(collection(db, 'Courses'), where('category', '==', category))
    const querySnapshot = await getDocs(q)

    const fetchedCourses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setCourseList(fetchedCourses)
    setLoading(false)
  }

  return (
    <View>

      {
        courseList?.length > 0 && 
        <CourseList
          courseList={courseList}
          heading={category}
        />
      }
    </View>
  )
}

export default CourseListByCategory

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 240
  }
})
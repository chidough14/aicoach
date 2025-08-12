import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../../context/UserDetailContext'
import { useRouter } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import CourseProgressCard from '../../components/Shared/CourseProgressCard'
import Colors from '../../constants/Colors'

export default function Progress() {
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

    setLoading(false)
  }

  useEffect(() => {
    userDetail && getCourseList()
  }, [userDetail])

  return (
    <View>
      <Image
        source={require('../../assets/images/wave.png')}
        style={{ position: 'absolute', width: '100%', height: 700 }}
      />

      <View
        style={{ position: 'absolute', width: '100%', padding: 20, marginTop: 30 }}
      >
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, color: Colors.WHITE, marginBlock: 10 }}>Course Progress</Text>
        <FlatList
          data={courseList}
          showsVerticalScrollIndicator={false}
          onRefresh={() => getCourseList()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/courseView/[courseId]',
                params: {
                  courseId: item?.docId,
                  courseParams: JSON.stringify(item)
                }
              })}
            >
              <CourseProgressCard item={item} width={"100%"} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}
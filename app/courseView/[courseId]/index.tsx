// import { View, Text, Image, ScrollView } from 'react-native';
// import React from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import { imageAssets } from '../../constants/Option';
// import Intro from '../../components/CourseView/Intro';
// import Colors from '../../constants/Colors';
// import Chapters from '../../components/CourseView/Chapters';

// export default function CourseView() {
//   const { courseParams } = useLocalSearchParams();
//   const course = typeof courseParams === 'string'
//     ? JSON.parse(courseParams)
//     : JSON.parse(Array.isArray(courseParams) ? courseParams[0] : '{}');

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: Colors.WHITE }}
//       contentContainerStyle={{ paddingBottom: 100 }}
//       showsVerticalScrollIndicator={false}
//     >
//       <Intro course={course} />
//       <Chapters course={course} />
//     </ScrollView>
//   );
// }

import { FlatList, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../../components/CourseView/Intro';
import Colors from '../../../constants/Colors'; // a new small component for a chapter
import ChapterItem from '../../../components/CourseView/ChapterItem';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export default function CourseView() {
  const { courseParams, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState(undefined)
  // const course = typeof courseParams === 'string'
  //   ? JSON.parse(courseParams)
  //   : JSON.parse(Array.isArray(courseParams) ? courseParams[0] : '{}');

  const getCourseById = async () => {
    const id = Array.isArray(courseId) ? courseId[0] : courseId;
    const docRef = await getDoc(doc(db, 'Courses', id));

    const courseData = docRef.data()
    setCourse(courseData)
  }

  useEffect(() => {
    if (!courseParams) {
      getCourseById()
    } else {
       setCourse(
         JSON.parse(Array.isArray(courseParams) ? courseParams[0] : courseParams || '{}')
       )
    }
  }, [courseId])

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      contentContainerStyle={{ padding: 8, paddingBottom: 50 }}
      data={course?.chapters || []}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ChapterItem
          item={item}
          index={index}
          docId={course.docId}
          completedChapter={course?.completedChapter}
        />
      )}
      ListHeaderComponent={() => (
        <View>
          <Intro course={course} />
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
              Chapters
            </Text>
          </View>
        </View>
      )}
    />
  );
}


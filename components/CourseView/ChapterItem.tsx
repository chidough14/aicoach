// components/CourseView/ChapterItem.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function ChapterItem({ item, index, docId, completedChapter }: any) {
  const router = useRouter()

  const isChapterCompleted = (index) => {
    if (completedChapter) {
      const isCompleted = completedChapter.find((item) => item == index)

      return isCompleted ? true : false
    } 
  }

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/chapterView',
          params: {
            chapterParams: JSON.stringify(item),
            docId: docId,
            chapterIndex: index,
          },
        })
      }
      style={{
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={[styles.chapterText, { flexShrink: 1, marginRight: 10 }]}
        numberOfLines={1} // Ensures long text is truncated with ellipsis
        ellipsizeMode="tail"
      >
        {index + 1}. {item.chapterName}
      </Text>

      {
        isChapterCompleted(index) ? <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} /> : <Ionicons name="play" size={24} color={Colors.PRIMARY} />
      }
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: 'outfit',
    fontSize: 18,
  },
})

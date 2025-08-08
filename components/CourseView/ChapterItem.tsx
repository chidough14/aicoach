// components/CourseView/ChapterItem.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function ChapterItem({ item, index }: any) {
  return (
    <View
      style={{
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.chapterText}>{index + 1}. {item.chapterName}</Text>
      </View>

      <Ionicons name="play" size={24} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: 'outfit',
    fontSize: 18
  }
})

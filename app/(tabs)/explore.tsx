import { View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { CourseCategory } from '../../constants/Option'
import CourseListByCategory from '../../components/Explore/CourseListByCategory'

export default function Explore() {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={<View
        style={{
          padding: 25,
          backgroundColor: Colors.WHITE,
          height: '100%'
        }}
      >
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>Explore More Courses</Text>

        {CourseCategory.map((item, index) => (
          <View key={index} style={{ marginTop: 10 }}>
            {/* <Text style={{fontFamily: 'outfit-bold', fontSize: 20}}>
                  { item }
                </Text> */}

            <CourseListByCategory category={item} />
          </View>
        ))}
      </View>} 
      renderItem={function (info: ListRenderItemInfo<any>): React.ReactElement | null {
        throw new Error('Function not implemented.')
      }}  
      style={{flex: 1, backgroundColor: Colors.WHITE}}  
    />

  )
}
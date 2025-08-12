import { View, Text, Image, StyleSheet, FlatList, ListRenderItemInfo, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constants/Colors'
import Button from '../../components/Shared/Button';

type QuizAnswer = {
  isCorrect: boolean;
  question: string
  userChoice: string
  correctAns: string
  // add other properties if needed
};

export default function Summary() {
  const { quizResultParam } = useLocalSearchParams();
  const quizResult: Record<string, QuizAnswer> = JSON.parse(
    Array.isArray(quizResultParam) ? quizResultParam[0] : quizResultParam || '{}'
  );
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    calculateResult();
  }, []);

  const calculateResult = () => {
    const correctAns_ = Object.entries(quizResult)?.filter(
      ([, value]) => value?.isCorrect === true
    );
    setCorrectAns(correctAns_.length);
    setTotalQuestions(Object.entries(quizResult)?.length);
  };

  const getPercMark = () => Math.round((correctAns / totalQuestions) * 100);

  return (
    <FlatList
      data={Object.entries(quizResult)}
      keyExtractor={([key]) => key}
      renderItem={({ item }) => {
        const quizItem = item[1];
        return (
          <View
            style={{
              padding: 15,
              margin: 10,
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 15,
              backgroundColor: quizItem?.isCorrect
                ? Colors.LIGHT_GREEN
                : Colors.LIGHT_RED,
              borderColor: quizItem?.isCorrect ? Colors.GREEN : Colors.RED,
            }}
          >
            <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>
              {quizItem?.question}
            </Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 15 }}>
              Ans: {quizItem?.correctAns}
            </Text>
          </View>
        );
      }}
      ListHeaderComponent={
        <View style={{ marginBottom: -15 }}>
          {/* Background Image */}
          <Image
            source={require('../../assets/images/wave.png')}
            style={{
              width: '100%',
              height: 700,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />

          {/* Overlay Content */}
          <View style={{ padding: 20, paddingTop: 40 }}>
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                textAlign: 'center',
                color: Colors.WHITE,
                marginBottom: 20,
              }}
            >
              Quiz Summary
            </Text>

            <View
              style={{
                backgroundColor: Colors.WHITE,
                padding: 20,
                borderRadius: 20,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Image
                source={require('../../assets/images/trophy.png')}
                style={{ width: 100, height: 100, marginTop: -50, marginBottom: 10 }}
              />

              <Text style={{ fontSize: 26, fontFamily: 'outfit-bold' }}>
                {getPercMark() > 60 ? 'Congratulations!' : 'Try Again'}
              </Text>
              <Text
                style={{
                  fontFamily: 'outfit',
                  color: Colors.GRAY,
                  fontSize: 17,
                  marginTop: 5,
                }}
              >
                You gave {getPercMark()}% correct answers!
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  width: '60%',
                }}
              >
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>q {totalQuestions}</Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>✅{correctAns}</Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>
                    ❌{totalQuestions - correctAns}
                  </Text>
                </View>
              </View>
            </View>

            <Button
              text="Back To Home"
              loading={false}
              onPress={() => router.replace('/(tabs)/home')}
            />

            {/* Smaller gap here */}
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                marginTop: 8,
              }}
            >
              Summary
            </Text>
          </View>
        </View>
      }



      // ListHeaderComponent={
      //   <>
      //     <Image
      //       source={require('../../assets/images/wave.png')}
      //       style={{ width: '100%', height: 700 }}
      //     />

      //     <View style={{ position: 'absolute', width: '100%', padding: 25 }}>
      //       <Text
      //         style={{
      //           fontFamily: 'outfit-bold',
      //           fontSize: 30,
      //           textAlign: 'center',
      //           color: Colors.WHITE,
      //         }}
      //       >
      //         Quiz Summary
      //       </Text>

      //       <View
      //         style={{
      //           backgroundColor: Colors.WHITE,
      //           padding: 20,
      //           borderRadius: 20,
      //           marginTop: 60,
      //           display: 'flex',
      //           alignItems: 'center'
      //         }}
      //       >
      //         <Image
      //           source={require('../../assets/images/trophy.png')}
      //           style={{ width: 100, height: 100, marginTop: -60 }}
      //         />

      //         <Text style={{ fontSize: 26, fontFamily: 'outfit-bold' }}>
      //           {getPercMark() > 60 ? 'Congratulations!' : 'Try Again'}
      //         </Text>
      //         <Text
      //           style={{
      //             fontFamily: 'outfit',
      //             color: Colors.GRAY,
      //             fontSize: 17,
      //           }}
      //         >
      //           You gave {getPercMark()}% correct answers!
      //         </Text>

      //         <View
      //           style={{
      //             display: 'flex',
      //             flexDirection: 'row',
      //             justifyContent: 'space-between',
      //             marginTop: 10,
      //           }}
      //         >
      //           <View style={styles.resultTextContainer}>
      //             <Text style={styles.resultText}>q {totalQuestions}</Text>
      //           </View>
      //           <View style={styles.resultTextContainer}>
      //             <Text style={styles.resultText}>✅{correctAns}</Text>
      //           </View>
      //           <View style={styles.resultTextContainer}>
      //             <Text style={styles.resultText}>
      //               ❌{totalQuestions - correctAns}
      //             </Text>
      //           </View>
      //         </View>
      //       </View>

      //       <Button
      //         text="Back To Home"
      //         loading={false}
      //         onPress={() => router.replace('/(tabs)/home')}
      //       />

      //       <Text
      //         style={{
      //           fontFamily: 'outfit-bold',
      //           fontSize: 25,
      //           marginTop: 25,

      //         }}
      //       >
      //         Summary
      //       </Text>
      //     </View>
      //   </>
      // }
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  );
}


const styles = StyleSheet.create({
  resultTextContainer: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    elevation: 1
  },
  resultText: {
    fontFamily: 'outfit',
    fontSize: 20
  }
})



//   return (
//     <FlatList
//       data={[]}
//       ListHeaderComponent={
//       <View>
//         <Image
//           source={require('../../assets/images/wave.png')}
//           style={{ width: '100%', height: 700 }} />

//         <View style={{ position: 'absolute', width: '100%', padding: 25 }}>
//           <Text
//             style={{
//               fontFamily: 'outfit-bold',
//               fontSize: 30,
//               textAlign: 'center',
//               color: Colors.WHITE
//             }}
//           >Quiz Summary</Text>
//           <View
//             style={{
//               backgroundColor: Colors.WHITE,
//               padding: 20,
//               borderRadius: 20,
//               marginTop: 60,
//               display: 'flex',
//               alignItems: 'center'
//             }}
//           >
//             <Image
//               source={require('../../assets/images/trophy.png')}
//               style={{ width: 100, height: 100, marginTop: -60 }} />

//             <Text style={{ fontSize: 26, fontFamily: 'outfit-bold' }}>
//               {getPercMark() > 60 ? 'Congratulations!' : 'Try Again'}
//             </Text>
//             <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 17 }}>
//               You gave {getPercMark()}% correct answers!
//             </Text>

//             <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginTop: 10
//               }}
//             >
//               <View style={styles.resultTextContainer}>
//                 <Text style={styles.resultText}>
//                   q {totalQuestions}
//                 </Text>
//               </View>

//               <View style={styles.resultTextContainer}>
//                 <Text style={styles.resultText}>
//                   ✅{correctAns}
//                 </Text>
//               </View>

//               <View style={styles.resultTextContainer}>
//                 <Text style={styles.resultText}>
//                   ❌{totalQuestions - correctAns}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <Button
//             text='Back To Home'
//             loading={false}
//             onPress={() => router.replace('/(tabs)/home')} />

//           <View
//             style={{
//               marginTop: 25,
//               // backgroundColor: Colors.WHITE,
//               flex: 1
//             }}
//           >
//             <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>Summary</Text>

//             <FlatList
//               data={Object.entries(quizResult)}
//               keyExtractor={([key]) => key}
//               renderItem={({ item, index }) => {
//                 const quizItem = item[1];
//                 return (
//                   <View
//                     style={{
//                       padding: 15,
//                       borderWidth: 1,
//                       marginTop: 5,
//                       borderRadius: 15,
//                       backgroundColor: quizItem?.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
//                       borderColor: quizItem?.isCorrect == true ? Colors.GREEN : Colors.RED
//                     }}
//                   >
//                     <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{quizItem?.question}</Text>

//                     <Text style={{ fontFamily: 'outfit', fontSize: 15 }}>Ans: {quizItem?.correctAns}</Text>
//                   </View>
//                 );
//               }} />
//           </View>
//         </View>
//       </View>
//       }
//       renderItem={function (info: ListRenderItemInfo<any>): React.ReactElement | null {
//         throw new Error('Function not implemented.');
//       }}
//     />
//   )
// }


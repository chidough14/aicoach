import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'
import Colors from '../../constants/Colors'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { UserDetailContext } from '../../context/UserDetailContext'

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const [loading, setLoading] = useState(false)
  

  const onSignInClick = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user
        await getUserDetail()
        setLoading(false)
        // router.replace('/(tabs)/home')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      });
  }

  const getUserDetail = async () => {
    const results = await getDoc(doc(db, 'users', email))
    console.log("getUserDetail", results.data())
    setUserDetail(results.data())
  }

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        flex: 1,
        padding: 25,
        backgroundColor: Colors.WHITE
      }}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: 180, height: 180 }}
      />

      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>Welcome Back</Text>

      <TextInput
        placeholder='Email'
        style={styles.textInput}
        onChangeText={(value) => setEmail(value)}
      />

      <TextInput
        placeholder='Password'
        style={styles.textInput}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          marginTop: 25,
          borderRadius: 10
        }}
        onPress={onSignInClick}
        disabled={loading}
      >
        {
          !loading ? (
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.WHITE,
                textAlign: 'center'
              }}
            >Log In</Text>
          ) : <ActivityIndicator size={'large'}  color={Colors.WHITE}/>
        }
      </TouchableOpacity>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          marginTop: 20
        }}
      >
        <Text style={{ fontFamily: 'outfit' }}>Don't have an account? </Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>Sign up here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 10
  }
})
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'
import Colors from '../../constants/Colors'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth, db } from '../../config/firebase'
import { setDoc, doc } from "firebase/firestore";
import { UserDetailContext } from '../../context/UserDetailContext'

export default function SignUp() {
  const router = useRouter()
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  const createNewAccount = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user
        await saveUser(user)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const saveUser = async (user) => {
    const data = {
      name: fullname,
      email: email,
      member: false,
      uid: user.uid
    }

    await setDoc(doc(db, 'users', email), data)
    
    setUserDetail(data)

    //Navigate to home
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

      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>Create new Account</Text>

      <TextInput
        placeholder='Full Name'
        style={styles.textInput}
        onChangeText={(value) => setFullname(value)}
      />

      <TextInput
        placeholder='Email'
        style={styles.textInput}
        onChangeText={(value) => setEmail(value)}
      />

      <TextInput
        placeholder='Password'
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
      />

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          marginTop: 25,
          borderRadius: 10
        }}
        onPress={createNewAccount}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center'
          }}
        >Create Account</Text>
      </TouchableOpacity>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          marginTop: 20
        }}
      >
        <Text style={{ fontFamily: 'outfit' }}>Already have an account? </Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>Sign in here</Text>
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
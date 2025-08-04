import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function SignUp() {
  const router = useRouter()

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
      />

      <TextInput
        placeholder='Password'
        style={styles.textInput}
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
        // onPress={() => router.push('/auth/signIn')}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center'
          }}
        >Log In</Text>
      </TouchableOpacity>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          marginTop: 20
        }}
      >
        <Text style={{fontFamily: 'outfit'}}>Don't have an account? </Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{color: Colors.PRIMARY, fontFamily: 'outfit-bold'}}>Sign up here</Text>
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
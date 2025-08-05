import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from '../constants/Colors'
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "../context/UserDetailContext";

export default function Index() {
  const router = useRouter()
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const results = await getDoc(doc(db, 'users', user?.email))
      setUserDetail(results.data())
      router.replace('/(tabs)/home')
    }
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE
      }}
    >
      <Image
        source={require("../assets/images/landing.png")}
        style={{
          width: '100%',
          height: 300,
          marginTop: 70
        }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: '100%',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-bold'
          }}
        >
          Welcome to Coaching Guru
        </Text>

        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            color: Colors.WHITE,
            textAlign: 'center',
            fontFamily: 'outfit'
          }}
        >Transform your ideas into engaging educational cotent with AI very effortlessly 📚📑</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/signUp')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/signIn')}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE
            }
          ]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 20
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit'
  }
})


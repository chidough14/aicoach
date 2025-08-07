import { View, Text, TouchableOpacity, GestureResponderEvent, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'

type ButtonProps = {
  text: string;
  type?: 'fill' | 'outline';
  onPress: (event: GestureResponderEvent) => void;
  loading: boolean
};

export default function Button({ text, type = "fill", onPress, loading }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: type == "fill" ? Colors.PRIMARY : Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
      }}
      onPress={onPress}
      disabled={loading}
    >
      {
        !loading ? (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: type == "fill" ? Colors.WHITE : Colors.PRIMARY
            }}
          >{text}</Text>
        ) : (
          <ActivityIndicator size={'small'} color={type == "fill" ? Colors.WHITE : Colors.PRIMARY} />
        )
      }
    </TouchableOpacity>
  )
}
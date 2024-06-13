import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity  onPress={()=>{auth().signOut().then(navigation.replace('LoginScreen'))}}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
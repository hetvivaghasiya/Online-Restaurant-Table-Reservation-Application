import { StyleSheet, StatusBar, View } from 'react-native'
import React from 'react'
import Video from 'react-native-video'
import auth from '@react-native-firebase/auth'

const SplashScreen = ({navigation}) => {
    setTimeout(() => {
        if(auth().currentUser){
          navigation.replace('HomeScreen')
        }else{
          navigation.replace('LoginScreen')
        }
    }, 3000);
  return (
    <View style={{
        height:'100%',
        width:'100%',
        backgroundColor:'#FFF7EC',
    }}>
        <StatusBar backgroundColor={'#FFF7EC'} barStyle='dark-content'/>
      <Video style={{flex:1,}} source={require('../Videos/intro.mp4')} resizeMode='contain'/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})
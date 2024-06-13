import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, StatusBar, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import Video from 'react-native-video';

const SignupScreen = ({ navigation }) => {
    const [Name, setName] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const validEmail = new RegExp('^[a-z0-9]+@gmail.com$');
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    const createUser = () => {
        try {
            auth()
                .createUserWithEmailAndPassword(Email, Password)
                .then(() => { navigation.replace('HomeScreen') })
                .catch((e) => {
                    if (e.code == 'auth/weak-password') {
                        ToastAndroid.show('Password must Contain 6 Characters', ToastAndroid.SHORT);
                    } else if (e.code == 'auth/email-already-in-use') {
                        Alert.alert(
                            'Email already in Use',
                            'Login Now',
                            [
                                { text: 'Cancel', onPress: () => { } },
                                { text: 'OK', onPress: () => { navigation.navigate('LoginScreen'); } },

                            ],
                            { cancelable: false }
                        )

                    }
                })
        } catch (e) { console.log(e) }
    }

    return (
        <ImageBackground style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-end' }} source={require('../Image/SignUpBack.jpg')}>
            <Video source={require('../Videos/SignUpBack.mp4')} style={{ height: '100%', width: '100%', position: 'absolute' }} muted={true} resizeMode='cover' repeat={true} />
            <StatusBar
                backgroundColor={'#00000000'}
                translucent={true}
            />
            <View style={{
                width: '100%',
                backgroundColor: '#00000095',
                paddingBottom: 70,
                paddingTop: 30,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderWidth: 1,
                borderTopColor: '#000000',

            }}>

                <Text style={styles.headerStyle}>SignUp</Text>

                <TextInput style={styles.inputStyle}
                    selectionColor={'#00000095'}
                    placeholder={'Name'}
                    placeholderTextColor={'#00000095'}
                    onChangeText={
                        (text) => { setName(text) }
                    }
                    value={Name}
                />

                <TextInput style={styles.inputStyle}
                    selectionColor={'#00000095'}
                    placeholder={'Email'}
                    placeholderTextColor={'#00000095'}
                    onChangeText={
                        (text) => { setEmail(text) }
                    }
                    value={Email}
                    keyboardType='email-address'
                    required
                />

                <TextInput style={styles.inputStyle}
                    selectionColor={'#00000095'}
                    placeholder={'Password'}
                    placeholderTextColor={'#00000095'}
                    onChangeText={
                        (text) => { setPassword(text) }
                    }
                    value={Password}

                />

                <TouchableOpacity style={{

                    backgroundColor: '#ff5757',
                    marginHorizontal: 50,
                    padding: 10,
                    marginTop: 30,
                    alignItems: 'center',
                    borderRadius: 5,

                }}
                    onPress={() => {
                        if (validEmail.test(Email) && validPassword.test(Password)) {
                            createUser()
                        } else if (!validEmail.test(Email)) {
                            ToastAndroid.show('Enter valid Email Address', ToastAndroid.SHORT);
                        } else if (!validPassword.test(Password)) {
                            ToastAndroid.show('Make your password strong', ToastAndroid.SHORT);
                        }
                    }}
                >
                    <Text style={{
                        color: '#ffffff',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>Create new account</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: '#ffffff',
                        alignSelf: 'center',
                        marginTop: 10,
                    }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }}>
                        <Text style={{
                            color: '#ff5757',
                            alignSelf: 'center',
                            marginTop: 10,
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        width: '80%',
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        paddingHorizontal: 15,
        color: '#000000',
        borderColor: '#ffffff',
        borderWidth: 1,
        marginTop: 15,
    },
    textStyle: {
        marginLeft: 15,
        fontSize: 17,
        color: '#FFFFFF',
        marginBottom: 10,
        marginTop: 15,
    },
    headerStyle: {
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    socialButton:
    {
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 20,
    }
})
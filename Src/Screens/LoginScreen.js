import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, StatusBar, ToastAndroid, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const LoginScreen = ({ navigation }) => {
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const validEmail = new RegExp('^[a-z0-9]+@gmail.com$');

    const loginUser = () => {
        try {
            auth()
                .signInWithEmailAndPassword(Email, Password)
                .then(() => { navigation.replace('HomeScreen') })
                .catch((e) => {
                    if (e.code == 'auth/user-not-found') {
                        Alert.alert(
                            'User Not Found',
                            'Sign Up Now',
                            [
                                { text: 'Cancel', onPress: () => { } },
                                { text: 'OK', onPress: () => { navigation.navigate('SignupScreen') } },

                            ],
                            { cancelable: false }
                        )
                    } else if (e.code == 'auth/wrong-password') {
                        ToastAndroid.show('Incorrect Password', ToastAndroid.SHORT);
                    }
                })
        } catch (e) { }
    }

    const googleUserLogin = async () => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential).then(() => { navigation.replace('HomeScreen') });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
            style={{
                width: '100%',
                height: '100%',
                flex: 1,
                justifyContent: 'flex-end',

            }}
            resizeMode='cover'
        >
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

                <Text style={styles.headerStyle}>Login</Text>

                <TextInput style={styles.inputStyle}
                    selectionColor={'#00000095'}
                    placeholder={'Email'}
                    placeholderTextColor={'#00000095'}
                    onChangeText={
                        (text) => { setEmail(text) }
                    }
                    value={Email}

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
                        if (validEmail.test(Email)) {
                            loginUser()
                        } else if (!validEmail.test(Email)) {
                            ToastAndroid.show('Enter valid Email Address', ToastAndroid.SHORT);
                        }
                    }}
                >
                    <Text style={{
                        color: '#ffffff',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>Login</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: '#ffffff',
                        alignSelf: 'center',
                        marginTop: 10,
                    }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen') }}>
                        <Text style={{
                            color: '#ff5757',
                            alignSelf: 'center',
                            marginTop: 10,
                        }}>SignUp</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                    <TouchableOpacity style={styles.socialButton} onPress={() => { googleUserLogin() }}>
                        <Image source={require('../Image/google.png')} style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../Image/phone.png')} style={{ height: '60%', width: '60%', alignSelf: 'center', justifyContent: 'center', }} />
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    )
}

export default LoginScreen

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
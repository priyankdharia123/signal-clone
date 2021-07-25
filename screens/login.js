import React from 'react';
import {useEffect,useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, Image, withTheme} from 'react-native-elements';
import {KeyboardAvoidingView} from "react-native"; 
import {StatusBar} from "expo-status-bar";
import { color } from 'react-native-elements/dist/helpers';
import {auth} from "../firebase"; 

const login = ({navigation}) => {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    useEffect(() => {

        const unsubscribe =  auth.onAuthStateChanged((authUser) =>{

            if(authUser){
                navigation.replace("HOME")
            }

            return unsubscribe; 
    
        }) 
    }, [])

    
    const signIn = () => {

         auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error)); 


    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" /> 
            <Image source = 

            {require('./logod.png')}

            style= {{width: 200, height: 200}}
            /> 
            <View style={styles.inputContainer}>

                <Input 

                    placeholder="Email" 
                    autoFocus 
                    type= "email"
                    color = "white"
                    value={email}
                    onChangeText = {(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password"
                    secureTextEntry 
                    type= "password"
                    value={password}
                    color = "white"
                    onChangeText = {(text) => setPassword(text)}
                    onSubmitEditing= {signIn}

                /> 

            </View>

            <Button containerStyle={styles.button} type = "outline" onPress={signIn} title="Login"/> 
            <Button 
            onPress={() => navigation.navigate("REGISTER")} 
            containerStyle={styles.button} 
            type = "outline" 
            title="Register"
            /> 

            <View style={{ height: 100}}/> 

        </KeyboardAvoidingView>
    )
}

export default login

const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        padding:10,
        backgroundColor: "black"

        },
    inputContainer:{

        width: 300,
    },

    button:{

        width:200,
        marginTop: 10,
        backgroundColor: "black",
    }





}); 

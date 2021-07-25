import React from 'react';
import {useLayoutEffect,useState} from "react";
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {Button, Input,Text, Image, withTheme} from 'react-native-elements';
import {StatusBar} from "expo-status-bar";
import {auth} from "../firebase"; 

const register = ({navigation}) => {

    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [imageLink, setImageLink] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        })
    },[navigation]) 


    const register1 = () => {

        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageLink || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            }); 
        })
        .catch((error) => alert(error.message)); 
    }; 


    return (

        <KeyboardAvoidingView behavior = "padding" style={styles.container}>
            <StatusBar style="light" /> 
            <Text h3 style= {{marginBottom:50,color:"white" }}>
            
            Create An Account
            </Text>

            <View style={styles.inputContainer}>
                <Input 

                    placeholder = "Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText = {(text) => setName(text)}
                    color="white"
                /> 
                <Input 

                    placeholder = "Email"
                    type="email"
                    value={email}
                    onChangeText = {(text) => setEmail(text)}
                    color="white"
                /> 

                <Input 

                    placeholder = "Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText = {(text) => setPassword(text)}
                    color="white"
                /> 

                <Input 

                    placeholder = "Profile Picture URL (OPTIONAL)"
                    type="text"
                    value={imageLink}
                    onChangeText = {(text) => setImageLink(text)}
                    onSubmitEditing={register1}
                    color="white"
                /> 



            </View>
            <Button containerStyle={styles.button} type = "outline" onPress={register1} title="Register"/> 

          
            <View style={{ height: 100}}/> 
        </KeyboardAvoidingView>
    )
}

export default register

const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        padding:10,
        backgroundColor: "black"
    },

    button:{
        width: 200
    },

    inputContainer:{
        width:300
    }
})

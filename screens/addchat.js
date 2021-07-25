import React, {useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input} from 'react-native-elements'; 
import { TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {db} from "../firebase"; 

const addchat = ({navigation}) => {

    const [input,setInput] = useState("");


    useLayoutEffect(() => {

        navigation.setOptions({

            title: "Add a New Chat",
            HeaderBackTitle:"Chats"
        })

        },[]) 

    const createchat = async () => {

        await db.collection('chats').add({

            chatName: input
        }).then(() => {

            navigation.goBack() 

        }).catch((error) => alert(error)); 



    }

    return (
        <View style={styles.container}>

            <Input

                placeholder = 'Enter a chat name'
                value ={input}
                onChangeText={(text) => setInput(text)}
                leftIcon = {
                    <Icon name="wechat" type="antdesign" size={24} color="black"/>
                }

            /> 

            
            <TouchableOpacity disabled={!input} onPress={createchat}>
                <View style={styles.button}>
                <Text style={styles.buttonText}> Create New Chat </Text>
                </View>
            </TouchableOpacity>
            
            
            {/* <Button style={styles.button} type = "light" onPress={createchat} title="hello">

            </Button> */}
            
            
        </View>
    );
};

export default addchat

const styles = StyleSheet.create({

    container:{
        backgroundColor: "white",
        padding:30,
        height:"100%",

    },

    button:{

        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'black',
    },

    buttonText:{

        color: 'white',
        fontSize: 16,
        textAlign: 'center',

    }

}); 

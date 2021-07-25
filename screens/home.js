import React from 'react'
import {useLayoutEffect,useState,useEffect} from "react";
import {SafeAreaView} from 'react-native'
import { TouchableOpacity } from 'react-native';
import { StyleSheet,ScrollView, Text, View } from 'react-native'
import {Avatar} from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import {auth,db} from '../firebase'
import login from './login';
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons" 

const home = ({navigation}) => {

    const [chats,setChats] = useState([]); 

    const signOutUser = () => {

        auth.signOut().then(()=> {

            navigation.replace('WELCOME')
        }); 
    }

    useEffect(() => {
        const unsubscribe=db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc=> ({

                id: doc.id,
                data:doc.data()
            }))) 

        )) 
            return unsubscribe; 
    }, [])

    useLayoutEffect(() => {

        navigation.setOptions({

            title: "Chats",
            headerTintColor:"white",
            headerLeft: () => (
            <View style={{marginLeft:20}}>

                <TouchableOpacity onPress = {signOutUser}>
                <Avatar rounded source= {{ uri: auth?.currentUser?.photoURL}}/> 
                </TouchableOpacity>


            </View>
        ), 
            headerRight:() => (

                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20,

                }}>

                    <TouchableOpacity activeOpacity={0.5}>

                        <AntDesign name='camerao' size={24} color="white"/>


                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("ADDCHAT")} activeOpacity={0.5}>

                        <SimpleLineIcons name='pencil' size={24} color="white"/>

                    </TouchableOpacity>


                </View>
            ) 


        }); 


    },[]); 

    const enterChat = (id,chatName) => {

        navigation.navigate("CHAT",{

            id, 
            chatName, 
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>

                {chats.map(({id,data:{chatName}}) => (

                    <CustomListItem 
                    key ={id} 
                    id={id} 
                    chatName={chatName} 
                    enterChat = {enterChat} 
                    /> 

                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default home

const styles = StyleSheet.create({

    container:{

        height: "100%",

    },
})

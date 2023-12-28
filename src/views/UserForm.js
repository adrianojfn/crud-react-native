import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import UsersContext from "../context/UsersContext";

export default ({route, navigation}) => {

    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext)
    
    return (
        <View style={style.form}>
            <Text>Name</Text>
            <TextInput 
                style={style.input}
                onChangeText={name => setUser({...user, name})}
                placeholder="Enter the name"
                value={user.name}
            />
            <Text>Email</Text>
            <TextInput 
                style={style.input}
                onChangeText={email => setUser({...user, email})}
                placeholder="Enter the email"
                value={user.email}
            />
            <Text>Avatar URL</Text>
            <TextInput 
                style={style.input}
                onChangeText={avatarUrl => setUser({...user, avatarUrl})}
                placeholder="Enter the Avatar URL"
                value={user.avatarUrl}
            />
            <Button title="Save" onPress={() => {
                dispatch({
                    type: user.id ? 'updateUser' : 'createUser',
                    payload: user,
                })
                navigation.goBack()
            }} />
        </View>
    )
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
    },
})
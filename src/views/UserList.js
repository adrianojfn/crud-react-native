import React, { useContext } from "react";
import { View, Text, FlatList, Alert } from 'react-native';
import { Avatar, Button, Icon, ListItem } from "@rneui/base";
import UsersContext from "../context/UsersContext";

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDelete(user) {
        Alert.alert('Delete user', 'Do you want to delete the user?', [
            {
                text: 'Yes',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'No'
            }
        ])
    }

    function getActions(user) {
        return (
            <>
                <Button onPress={() => props.navigation.navigate('UserForm', user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button onPress={() => confirmUserDelete(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </>
        )
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar rounded source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(user)}
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}
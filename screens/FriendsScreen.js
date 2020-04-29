import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import * as firebase from 'firebase';

export default class FriendsScreen extends Component {

    static navigationOptions = {
        headerShown: false,
    }
    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Text>Friend Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
//import { TagArea, Chip } from 'react-native-chip-tags'

import * as firebase from 'firebase';
import 'firebase/firestore';


export default class LogsScreen extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        accountName: "",
        users: []
    }

    handleAddAccount = () => {
        const { accountName, users } = this.state;

        console.log(users);

        /*const db = firebase.firestore();

        db.collection("accounts").doc(firebase.auth().currentUser.uid).create({
            //users: this.state.users
            name: accountName,
            createdAt: Date.now(),
            currency: "$",
            logs: []
        })
        .then(function() {
            
            
            
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });*/

    }

    _handleOnTagAdded = (tag) => {
        console.log(tag);
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                <View>
                    <View>
                        <Text>AccountName</Text>
                        <TextInput
                            onChangeText={accountName => this.setState({ accountName })}
                            value={this.state.accountName}
                        ></TextInput>
                    </View>
                </View>

                {/* <TagArea handleTagChanged={this._handleOnTagAdded} /> */}
                
                <TouchableOpacity onPress={this.handleAddAccount}>
                    <Text>Add</Text>
                </TouchableOpacity>

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
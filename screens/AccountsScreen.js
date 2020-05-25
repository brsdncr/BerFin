import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Picker } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
//import firestore from '@react-native-firebase/firestore';

export default class AccountsScreen extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        accountName: "",
        users: [],
        currency: "",
        showOverLay: false
    }

    handleAddAccount = async () => {
        const { accountName, users, currency } = this.state;

        const db = firebase.firestore();

        // Add a new document in collection "accounts"
        /*db.collection("users").doc(firebase.auth().currentUser.uid).collection("accounts").add({
            name: accountName,
            createdAt: Date.now(),
            currency: "$",
            logs: [],
            users: []
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });*/

        const acc = await db.collection("users").doc(firebase.auth().currentUser.uid).collection("accounts").doc(accountName).get();
        if (acc && acc.exists){
            console.log("Account with name: " + accountName + " already exists");
        }
        else {
            db.collection("users").doc(firebase.auth().currentUser.email).collection("accounts").doc(accountName).set({
                name: accountName,
                createdAt: Date.now(),
                currency: currency,
                logs: [],
                users: users
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }

    }

    handleOnTagAdded = (tag) => {
        console.log(tag);
    }

    handleNewAccountButton = () => {
        this.setState({showOverLay: !this.state.showOverLay});
    }

    handleCurrencyChange = (currency) => {
        this.setState({currency: currency});
    }

    render(){
        const accountForm = 
        <View>
            <View>
                <View>
                    <Text>AccountName</Text>
                    <TextInput
                        onChangeText={accountName => this.setState({ accountName })}
                        value={this.state.accountName}
                    ></TextInput>
                </View>
            </View>
            <View>
                <View>
                    <Text>Share With</Text>
                    <TextInput
                        onChangeText={
                            (arr) => {
                                this.setState({ users: arr.split(';') })
                            }
                        }
                        value={this.state.users}
                    ></TextInput>
                </View>
            </View>
            <View>
                <View>
                    <Text>Currency</Text>
                    <Picker selectedValue = {this.state.currency} onValueChange = {this.handleCurrencyChange}>
                        <Picker.Item label = "EUR" value = "EUR" />
                        <Picker.Item label = "USD" value = "USD" />
                        <Picker.Item label = "TRY" value = "TRY" />
                    </Picker>
            <Text /*style = {styles.text}*/>{this.state.currency}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={this.handleAddAccount}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <TouchableOpacity onPress={this.handleNewAccountButton}>
                    <Text>+</Text>
                </TouchableOpacity>
                

                {this.state.showOverLay ? 
                    accountForm 
                    : 
                    null
                }

                {/* <TagArea handleTagChanged={this._handleOnTagAdded} /> */}
                
                

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
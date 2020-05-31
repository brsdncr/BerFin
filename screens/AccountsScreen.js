import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,
    TouchableOpacity, StatusBar, Picker, FlatList } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { NavigationEvents } from 'react-navigation';
import AccountItem from '../components/AccountItem';

export default class AccountsScreen extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        accountName: "",
        users: [],
        currency: "",

        showOverLay: false,
        allAccounts: []
    }

    // componentDidMount() {
    //     this.getAccountData();
    // }


    getAccountData = async () => {

        //this.props.navigation.navigate("Detail");
        //console.log(this.props.navigation.state)
        //return;
        const db = firebase.firestore();
        //const userAccounts = await db.collection("users").doc(firebase.auth().currentUser.email).collection("accounts").get();
        
        const path = 'users/'+firebase.auth().currentUser.email+'/accounts';
        console.log(path);
        let accountsRef = db.collection(path);
        let accs = [];
        let allAccounts = await accountsRef.get()
        .then(accounts => {
            accounts.forEach(account => {
                //console.log(account.id, '=>', account.data());
                accs.push({
                    id: account.id,
                    name: account.data().name
                });
            });
            
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

        this.setState({ allAccounts: accs })
        console.log(this.state.allAccounts);

    };

    handleAddAccount = async () => {
        const { accountName, users, currency } = this.state;

        const db = firebase.firestore();

        const acc = await db.collection("users").doc(firebase.auth().currentUser.email).collection("accounts").doc(accountName).get();
        if (acc && acc.exists){
            console.log("Account with name: " + accountName + " already exists");
        }
        else {
            //In order to set document with accountName
            //db.collection("users").doc(firebase.auth().currentUser.email).collection("accounts").doc(accountName).set({
            
            //add with random account id
            db.collection("users").doc(firebase.auth().currentUser.email).collection("accounts").doc().set({
                name: accountName,
                createdAt: Date.now(),
                currency: currency,
                logs: [],
                users: users
            })
            .then(function() {
                this.getAccountData();
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
            </View>
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
                        <Picker.Item label = "Please select a currency" value = "" />
                        <Picker.Item label = "EUR" value = "EUR" />
                        <Picker.Item label = "USD" value = "USD" />
                        <Picker.Item label = "TRY" value = "TRY" />
                    </Picker>
                </View>
            </View>
            <TouchableOpacity onPress={this.handleAddAccount}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <FlatList
                    data={this.state.allAccounts}
                    // renderItem={({ item }) => <Item title={item.name} />}
                    renderItem={({ item }) => <AccountItem title={item.name} id={item.id} navigator={this.props.navigation}/>}
                    keyExtractor={item => item.id}
                />
                <TouchableOpacity onPress={this.handleNewAccountButton}>
                    <Text>+</Text>
                </TouchableOpacity>
                

                {this.state.showOverLay ? 
                    accountForm 
                    : 
                    null
                }

                {/* <TagArea handleTagChanged={this._handleOnTagAdded} /> */}
                
                
                <NavigationEvents onDidFocus={this.getAccountData} />
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
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { NavigationEvents } from 'react-navigation';




export default class LogsScreen extends Component {

    state = {
        name: "",
        users: [],
        currency: "",
        createdAt: "",
        logs: []
    }

    goBack = () => {
        this.props.navigation.navigate("Accounts");
    }

    componentDidMount() {
        this.setState({ accountId: this.props.navigation.state.params.accountId })
    }


    getAccountData = async () => {

        const db = firebase.firestore();

        let accountsRef = db.collection('users/'+firebase.auth().currentUser.email+'/accounts').doc(this.state.accountId);
        let getDoc = accountsRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                const data = doc.data();
                this.setState({
                    name: data.name,
                    users: data.users,
                    currency: data.currency,
                    createdAt: data.createdAt,
                    logs: data.logs
                })
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    };

    render(){
        return (
            <View style={styles.container}>
                <View>
                    <Text>
                        {this.state.name}
                    </Text>
                </View>
                <View>
                    <Text>
                        {this.state.users[0]}
                    </Text>
                </View>
                <View>
                    <Text>
                        {this.state.currency}
                    </Text>
                </View>
                <View>
                    <Text>
                        {this.state.createdAt}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.goBack}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
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
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends Component {

    state = {
        email: "",
        displayName: ""
    }
    componentDidMount = () => {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    handleSignout = () => {
        firebase.auth().signOut();
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    Welcome back {this.state.displayName}
                </Text>

                <TouchableOpacity onPress={this.handleSignout}>
                    <Text>
                        Logout
                    </Text>
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
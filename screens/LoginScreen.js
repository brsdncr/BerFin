import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        email: "",
        password: "",
        errorMessage: ""
    }

    handleLogin = () => {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}))
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Text>BerFin</Text>

                <View>
                    <Text>{this.state.errorMessage}</Text>
                </View>

                <View>
                    <View>
                        <Text>Email Address</Text>
                        <TextInput
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>
                    <View>
                        <Text>Password</Text>
                        <TextInput
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>
                
                <TouchableOpacity onPress={this.handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')}>
                    <Text>Go to Signup</Text>
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
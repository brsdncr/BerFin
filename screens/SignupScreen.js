import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import * as firebase from 'firebase';

export default class SignupScreen extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    state = {
        username: "",
        email: "",
        password: "",
        errorMessage: ""
    }

    handleSignup = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.username
                });
            })
            .catch((error) => this.setState({errorMessage: error.message}))
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
                        <Text>Username</Text>
                        <TextInput
                            autoCapitalize="none"
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username}
                        ></TextInput>
                    </View>
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
                
                <TouchableOpacity onPress={this.handleSignup}>
                    <Text>Signup</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
                    <Text>Go to Login</Text>
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
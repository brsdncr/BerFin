import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as firebase from 'firebase';
import { NavigationEvents } from 'react-navigation';



export default class ProfileScreen extends Component {

    state = {
        displayName: "",
        photoURL: "",
        email: "",
        createdAt: ""
    }
      
    loadProfile = async () => {

        const { displayName, email, photoURL } = firebase.auth().currentUser;
        console.log(photoURL);

        let currentPhoto;
        if(!photoURL){
            currentPhoto = "https://i.picsum.photos/id/237/200/300.jpg";
        }
        
        await this.setState({
            displayName,
            email,
            photoURL: currentPhoto
        });

        console.log(this.state);

    }

    render(){
        return (
            <View style={styles.container}>
                <View>
                    <Image 
                        style={{width: 150,
                            height: 150,
                            borderRadius: 150 / 2,
                            overflow: "hidden"}}
                        source={{uri: this.state.photoURL}}
                        />
                </View>
                <NavigationEvents onDidFocus={this.loadProfile} />
                <Text> {this.state.displayName} </Text>
                <Text> {this.state.email} </Text>
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
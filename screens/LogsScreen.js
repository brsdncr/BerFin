import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { TagArea, Chip } from 'react-native-chip-tags'




export default class LogsScreen extends Component {

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    Log Screen
                </Text>
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
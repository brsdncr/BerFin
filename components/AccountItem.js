import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class AccountItem extends Component {

    handleAccountOpen = () => {
        console.log("Clicked on item with id: " + this.props.id);
        this.props.navigator.navigate("Logs", {
            accountId: this.props.id
        });

        // this.props.navigator.navigate("Logs", {
        //     type: "Navigate", 
        //     routeName: "Logs",
        //     action: {
        //         params: {
        //             accountId: this.props.id
        //         }
        //     }
        // });

    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.handleAccountOpen}>
                    <Text>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
            );
    }
}
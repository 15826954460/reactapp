import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default class Vue2 extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Vue2.0</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

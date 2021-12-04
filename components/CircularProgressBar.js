import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress
                    size={90}
                    width={9}
                    fill={78}
                    tintColor="#67B779"
                    padding={10}
                    backgroundColor="#3d587550">
                    {
                        (fill) => (
                            <Text>
                                {"78 %"}
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
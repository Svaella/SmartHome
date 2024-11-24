import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CameraScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Smart Home Control</Text>
            </View>
            <Text style={styles.title}>Cámara</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#87CEEB',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
});

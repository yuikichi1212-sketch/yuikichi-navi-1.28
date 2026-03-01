import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

export default function FavoritesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>お気に入り</Text>
                <Text style={styles.subtitle}>登録された場所やルートがここに表示されます</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
    }
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('位置情報へのアクセスが拒否されました');
                setLoading(false);
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
            setLoading(false);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#FFFF00" />
                </View>
            ) : errorMsg ? (
                <View style={styles.center}>
                    <Text>{errorMsg}</Text>
                </View>
            ) : (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_DEFAULT}
                        initialRegion={{
                            latitude: location ? location.coords.latitude : 35.681236, // Tokyo Station as fallback
                            longitude: location ? location.coords.longitude : 139.767125,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        showsCompass={false}
                    >
                    </MapView>

                    <View style={styles.floatingContainer}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="search" size={20} color="#333" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>検索</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.homeButton]}
                        >
                            <Ionicons name="home" size={20} color="#333" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>家へ帰る</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // 白基調
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    floatingContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#FFFF00', // 優しい黄色
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    homeButton: {
        paddingHorizontal: 25,
    },
    buttonText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonIcon: {
        marginRight: 8,
    }
});

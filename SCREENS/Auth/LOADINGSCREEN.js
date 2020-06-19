import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import { useDispatch } from 'react-redux';
const LoadingScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            console.log(userData);
            if (!userData) {
                props.navigation.navigate('LOGIN');
                return;
            }
            props.navigation.navigate('Feed');
        }
        tryLogin();
    }, [dispatch]);

    return (
        <View>
            <StatusBar />
            <ActivityIndicator size="large" color='green' />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default LoadingScreen;
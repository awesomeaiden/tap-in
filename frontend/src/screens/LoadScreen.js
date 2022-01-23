import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: false,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {

    }
});

function LoadScreen () {
    const navigation = useNavigation();
    storage.load({
        key: 'token',
        autoSync: 'false'
    }).then(ret => {
        if (ret != null) {
            verify(ret.token, navigation);
        }
    }).catch(err => {
        if (err != null) {
            navigation.navigate('Home');
        }
    })
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text category='h1'>Load SCREEN</Text>
            <Button onPress={() => home(navigation)}>Home</Button>
        </Layout>
    );
};

async function home(navigation) {
    navigation.navigate('Home');
}

async function verify(token, navigation) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: 'follow'
    }
    let response = await fetch('https://tap-in-339002.uc.r.appspot.com/profile', requestOptions);
    let js = (await response.json())
    let id = js.id;
    if (id != undefined) {
        navigation.navigate('Profile');
    } else {
        navigation.navigate('Home');
    }
}

export default () => (
    <ApplicationProvider {...eva} theme={eva.dark}>
        <LoadScreen />
    </ApplicationProvider>
);

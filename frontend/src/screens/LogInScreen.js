import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {TextInput} from "react-native";
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
        // we'll talk about the details later.
    }
});


function LogInScreen () {
    const navigation = useNavigation();
    const [username, usernameChange] = React.useState('User');
    const [password, passwordChange] = React.useState(null);
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category='h1'>Log In SCREEN</Text>
        <Text category='h1'>Username</Text>
        <Input onChangeText={text => usernameChange(text)} value={username}/>
        <Text category='h1'>Password</Text>
        <Input onChangeText={text => passwordChange(text)} secureTextEntry={true} value={password}/>
        <Button onPress={() => verify(username, password, navigation)}>Button</Button>
        </Layout>
    );
};

async function verify(username, password, navigation) {
    let response = await fetch('https://tap-in-339002.uc.r.appspot.com/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "pass": password,
            "email": username
        })
    })
    let token = (await response.json()).token;
    if (token != undefined) {
        await storage.save(
            {
                key: 'token',
                data: {
                    token: token
                },
                expires: null
            }
        ).then(() => {
            navigation.navigate('Profile')
        })
    }
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <LogInScreen />
  </ApplicationProvider>
);
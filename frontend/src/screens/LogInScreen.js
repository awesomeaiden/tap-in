import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

function LogInScreen () {
    const navigation = useNavigation();
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category='h1'>Log In SCREEN</Text>
        <Button onPress={() => navigation.navigate('Profile')}>Button</Button>
        </Layout>
    );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <LogInScreen />
  </ApplicationProvider>
);
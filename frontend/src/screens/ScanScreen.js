import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

function ScanScreen () {
    const navigation = useNavigation();
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category='h1'>TEST SCREEN</Text>
        <Button onPress={() => navigation.navigate('Home')}>Button</Button>
        </Layout>
    );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <ScanScreen />
  </ApplicationProvider>
);
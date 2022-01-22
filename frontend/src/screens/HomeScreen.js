import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

function HomeScreen () {
  const navigation = useNavigation();
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME SCREEN</Text>
    <Button onPress={() => navigation.navigate('Sign Up')}>Sign Up</Button>
    <Button onPress={() => navigation.navigate('Log In')}>Log In</Button>
    </Layout>
  );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <HomeScreen />
  </ApplicationProvider>
);

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';

const HomeScreen = ({navigation}) => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME SCREEN</Text>
    <Button onPress={() => navigation.navigate('Test')}>Button</Button>
  </Layout>
);

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <HomeScreen />
  </ApplicationProvider>
);
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';

const TestScreen = ({navigation}) => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>TEST SCREEN</Text>
    <Button onPress={() => navigation.navigate('Home')}>Button</Button>
  </Layout>
);

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <TestScreen />
  </ApplicationProvider>
);
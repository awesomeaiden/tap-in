import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SocialIcon } from 'react-native-elements';


function ProfileScreen () {
  const navigation = useNavigation();
//   return (
//     <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Text category='h1'>My Profile</Text>
//     <Button onPress={() => navigation.navigate('Home')}>Tap!</Button>
//     </Layout>
//   );
   const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
          Social Icons
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <SocialIcon
                type="facebook"
                onPress={() => {
                  alert('facebook');
                }}
              />
              <Text style={{ textAlign: 'center' }}>facebook</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <SocialIcon
                type="instagram"
                onPress={() => {
                  alert('instagram');
                }}
              />
              <Text style={{ textAlign: 'center' }}>instagram</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <SocialIcon
                type="linkedin"
                onPress={() => {
                  alert('linkedin');
                }}
              />
              <Text style={{ textAlign: 'center' }}>linkedin</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <SocialIcon
                type="pinterest"
                onPress={() => {
                  alert('pinterest');
                }}
              />
              <Text style={{ textAlign: 'center' }}>pinterest</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <SocialIcon
                type="twitter"
                onPress={() => {
                  alert('twitter');
                }}
              />
              <Text style={{ textAlign: 'center' }}>twitter</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <ProfileScreen />
  </ApplicationProvider>
);

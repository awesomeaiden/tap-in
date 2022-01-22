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
          <View style={{ width: '100%' }}>
            <SocialIcon
              title="Sign In Envelope"
              button
              type="envelope"
              onPress={() => {
                alert('Envelope');
              }}
            />
          </View>
 
          <View style={{ width: '100%'}}>
            <SocialIcon
              button
              title="Sign In Facebook"
              type="facebook"
              onPress={() => {
                alert('facebook');
              }}
            />
          </View>
 
          <View style={{ width: '100%'}}>
            <SocialIcon
              title="Sign In Instagram"
              button
              type="instagram"
              onPress={() => {
                alert('instagram');
              }}
            />
          </View>
 
          <View style={{ width: '100%' }}>
            <SocialIcon
              title="Sign In Linkedin"
              button
              type="linkedin"
              onPress={() => {
                alert('linkedin');
              }}
            />
          </View>
         
          <View style={{ width: '100%' }}>
            <SocialIcon
              title="Sign In Youtube"
              button
              type="youtube"
              onPress={() => {
                alert('youtube');
              }}
            />
          </View>
 
          <View style={{ width: '100%'}}>
            <SocialIcon
              title="Sign In Twitter"
              button
              type="twitter"
              onPress={() => {
                alert('twitter');
              }}
            />
          </View>

          <View style={{ width: '100%'}}>
            <SocialIcon
              title="Sign In Snapchat"
              button
              type="snapchat"
              onPress={() => {
                alert('Snapchat');
              }}
            />
          </View>

          <View style={{ width: '100%'}}>
            <SocialIcon
              title="Sign In Discord"
              button
              type="discord"
              onPress={() => {
                alert('discord');
              }}
            />
          </View>
          </ScrollView>
  );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <ProfileScreen />
  </ApplicationProvider>
);

import React, { useState} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import { Icon, SocialIcon } from 'react-native-elements';
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


function ProfileScreen () {
  const navigation = useNavigation();

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },

      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "black"
      }
  });

  //states for titles of the different buttons
  //each state variable can be used as the username when filled in by the user
  const [emailTitle, setEmailTitle] = useState("Connect Email");
  const [facebookTitle, setFacebookTitle] = useState("Connect Facebook");
  const [instagramTitle, setInstagramTitle] = useState("Connect Instagram");
  const [linkedlnTitle, setLinkedlnTitle] = useState("Connect Linkeldn");
  const [youtubeTitle, setYoutubeTitle] = useState("Connect YouTube");
  const [twitterTitle, setTwitterTitle] = useState("Connect Twitter");
  const [snapchatTitle, setSnapchatTitle] = useState("Connect Snapchat");
  const [discordTitle, setDiscordTitle] = useState("Connect Discord");

  //states for user input modals
  const [emailModalVisible, setEmailModalVisible] = useState(false);

  //states for user input modals
  const [emailInput, setEmailInput] = useState("");

  const emailSubmitHandler = (text) =>{
    setEmailInput(text);
  }
return (
    <ScrollView>  
          <View style={{ width: '100%' }}>
            <SocialIcon
              title={emailTitle}
              button
              type="envelope"
              onPress={() => {
                setEmailModalVisible(true);
              }}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={emailModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setEmailModalVisible(!emailModalVisible);
            let token;
            storage.load({
                key: 'token'
            }).then(ret => {
                token = ret.token;
            })
            let response = fetch('https://tap-in-339002.uc.r.appspot.com/profile/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: {
                    "name": 'email',
                    "link": emailInput
                }
            })
            console.log(response.json());
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your email</Text>
                    <Input onChangeText={emailSubmitHandler} value={emailInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setEmailModalVisible(!emailModalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>
          <View style={{ width: '100%'}}>
            <SocialIcon
              button
              title={facebookTitle}
              type="facebook"
              onPress={() => {
                alert('facebook');
              }}
            />
          </View>
          <View style={{ width: '100%'}}>
            <SocialIcon
              title={instagramTitle}
              button
              type="instagram"
              onPress={() => {
                alert('instagram');
              }}
            />
          </View>
          <View style={{ width: '100%' }}>
            <SocialIcon
              title={linkedlnTitle}
              button
              type="linkedin"
              onPress={() => {
                alert('linkedin');
              }}
            />
          </View>
          <View style={{ width: '100%' }}>
            <SocialIcon
              title={youtubeTitle}
              button
              type="youtube"
              onPress={() => {
                alert('youtube');
              }}
            />
          </View>
          <View style={{ width: '100%'}}>
            <SocialIcon
              title={twitterTitle}
              button
              type="twitter"
              onPress={() => {
                alert('twitter');
              }}
            />
          </View>
          <View style={{ width: '100%'}}>
            <SocialIcon
              title={snapchatTitle}
              button
              style= {{backgroundColor: 'yellow'}}
              type="snapchat"
              onPress={() => {
                alert('Snapchat');
              }}
            />
          </View>
          <View style={{ width: '100%'}}>
            <SocialIcon
              title={discordTitle}
              button
              type="discord"
              onPress={() => {
                alert('discord');
              }}
            />
          </View>
          <View style={{width:'100%'}}>
              <Icon
                  title={'QRCode'}
                  button
                  type="fa fa-code"
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

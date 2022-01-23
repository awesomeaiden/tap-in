import React, { useState} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import { SocialIcon } from 'react-native-elements';


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
  const [facebookModalVisible, setFacebookModalVisible] = useState(false);
  const [instagramModalVisible, setInstagramModalVisible] = useState(false);
  const [linkedlnModalVisible, setLinkedlnModalVisible] = useState(false);
  const [youtubeModalVisible, setYoutubeModalVisible] = useState(false);
  const [twitterModalVisible, setTwitterModalVisible] = useState(false);
  const [snapchatModalVisible, setSnapchatModalVisible] = useState(false);
  const [discordModalVisible, setDiscordModalVisible] = useState(false);

  //states for user input modals
  const [emailInput, setEmailInput] = useState("");
  const [facebookInput, setFacebookInput] = useState("");
  const [instagramInput, setInstagramInput] = useState("");
  const [linkedlnInput, setLinkedlnInput] = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [twitterInput, setTwitterInput] = useState("");
  const [snapchatInput, setSnapchatInput] = useState("");
  const [discordInput, setDiscordInput] = useState("");

  const emailSubmitHandler = (text) => {
    setEmailInput(text);
  }

  const connectEmailHandler = (title) => {
    setEmailModalVisible(!emailModalVisible);
    setEmailTitle(title);
}
  const facebookSubmitHandler = (text) => {
        setFacebookInput(text);
    }

  const connectFacebookHandler = (title) => {
    setFacebookModalVisible(!facebookModalVisible);
    setFacebookTitle(title);
}
  const instagramSubmitHandler = (text) => {
    setInstagramInput(text);
  }

  const connectInstagramHandler = (title) => {
    setInstagramModalVisible(!instagramModalVisible);
    setInstagramTitle(title);
}
 const linkeldnSubmitHandler = (text) => {
    setLinkedlnInput(text);
  }

  const connectLinkedlnHandler = (title) => {
    setLinkedlnModalVisible(!linkedlnModalVisible);
    setLinkedlnTitle(title);
}
 const youtubeSubmitHandler = (text) => {
    setYoutubeInput(text);
  }

  const connectYoutubeHandler = (title) => {
    setYoutubeModalVisible(!youtubeModalVisible);
    setYoutubeTitle(title);
}
  const twitterSubmitHandler = (text) => {
    setTwitterInput(text);
  }

  const connectTwitterHandler = (title) => {
    setTwitterModalVisible(!twitterModalVisible);
    setTwitterTitle(title);
}
  const snapchatSubmitHandler = (text) => {
    setSnapchatInput(text);
  }

  const connectSnapchatHandler = (title) => {
    setSnapchatModalVisible(!snapchatModalVisible);
    setSnapchatTitle(title);
}
  const discordSubmitHandler = (text) => {
    setDiscordInput(text);
  }

  const connectDiscordHandler = (title) => {
    setDiscordModalVisible(!discordModalVisible);
    setDiscordTitle(title);
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
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your email</Text>
                    <Input onChangeText={emailSubmitHandler} value={emailInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectEmailHandler(emailInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
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
                setFacebookModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={facebookModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setFacebookModalVisible(!facebookModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your facebook username</Text>
                    <Input onChangeText={facebookSubmitHandler} value={facebookInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectFacebookHandler(facebookInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>


          <View style={{ width: '100%'}}>
            <SocialIcon
              title={instagramTitle}
              button
              type="instagram"
              onPress={() => {
                setInstagramModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={instagramModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setInstagramModalVisible(!instagramModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your instagram username</Text>
                    <Input onChangeText={instagramSubmitHandler} value={instagramInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectInstagramHandler(instagramInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>

          <View style={{ width: '100%' }}>
            <SocialIcon
              title={linkedlnTitle}
              button
              type="linkedin"
              onPress={() => {
                setLinkedlnModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={linkedlnModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setLinkedlnModalVisible(!linkedlnModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your linkedln username</Text>
                    <Input onChangeText={linkeldnSubmitHandler} value={linkedlnInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectLinkedlnHandler(linkedlnInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>


          <View style={{ width: '100%' }}>
            <SocialIcon
              title={youtubeTitle}
              button
              type="youtube"
              onPress={() => {
                setYoutubeModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={youtubeModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setYoutubeModalVisible(!youtubeModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your youtube username</Text>
                    <Input onChangeText={youtubeSubmitHandler} value={youtubeInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectYoutubeHandler(youtubeInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>

          <View style={{ width: '100%'}}>
            <SocialIcon
              title={twitterTitle}
              button
              type="twitter"
              onPress={() => {
                setTwitterModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={twitterModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setTwitterModalVisible(!linkedlnModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your twitter username</Text>
                    <Input onChangeText={twitterSubmitHandler} value={twitterInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectTwitterHandler(twitterInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>

          <View style={{ width: '100%'}}>
            <SocialIcon
              title={snapchatTitle}
              button
              style= {{backgroundColor: 'yellow'}}
              type="snapchat"
              onPress={() => {
                setSnapchatModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={snapchatModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setSnapchatModalVisible(!snapchatModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your snapchat username</Text>
                    <Input onChangeText={snapchatSubmitHandler} value={snapchatInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectSnapchatHandler(snapchatInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>


          <View style={{ width: '100%'}}>
            <SocialIcon
              title={discordTitle}
              button
              type="discord"
              onPress={() => {
                setDiscordModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={discordModalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setDiscordModalVisible(!discordModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter your discord username</Text>
                    <Input onChangeText={discordSubmitHandler} value={discordInput}></Input>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => connectDiscordHandler(discordInput)}>
                    <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>
    </ScrollView>
  );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <ProfileScreen />
  </ApplicationProvider>
);

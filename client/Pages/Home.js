import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styles } from '../styles';
import { SecureStore } from 'expo';
import { Button } from 'react-native-elements';

export default class extends Component {
  state = { response: '' }

  async componentDidMount() {
    try {
      let expiration = await SecureStore.getItemAsync('fbExpiration');
      let tokenTime = await SecureStore.getItemAsync('fbTokenTime');
      let token = await SecureStore.getItemAsync('fbToken');
      if (expiration && tokenTime && token) {
        let currentTime = new Date().getTime;
        if (tokenTime + (expiration / 1000) <= currentTime) {
          await SecureStore.deleteItemAsync('fbToken');
          await SecureStore.deleteItemAsync('fbTokenTime');
          await SecureStore.deleteItemAsync('fbExpiration');
          await SecureStore.deleteItemAsync('fbId');
          expiration = tokenTime = token = currentTime = null;
        }
      }
      if (token) this.props.navigation.navigate('Pin');
    }
    catch (err) {
      console.error(err);
    }
  }

  login = async () => {
    const APP_ID = '414644268964862';
    const options = {
      permissions: ['public_profile', 'email'],
    }
    const {type, token, expires} = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, options);
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      this.setState({ response });
      const fbId = JSON.parse(response._bodyInit).id;
      const fbDate = response.headers.map.date[0];
      const responseName = await response.json();
      // Alert.alert('fbToken', `${typeof token}`);
      const tokenDate = new Date().getTime();
      await SecureStore.setItemAsync('fbTokenTime', tokenDate.toString());
      // Alert.alert('response', `${JSON.stringify(tokenDate, null, 2)}`);
      // Alert.alert('fbExpiration', `${expires}`);
      // Alert.alert('date', `${JSON.stringify(new Date().getTime(), null, 2)}`);
      await SecureStore.setItemAsync('fbId', fbId);
      await SecureStore.setItemAsync('fbToken', token);
      await SecureStore.setItemAsync('fbExpiration', expires.toString());
      this.props.navigation.navigate('Pin');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Login With</Text>
        <View style={styles.buttonGroup}>
          <Button
            icon={{ name: 'person' }}
            onPress={() => this.login()}
            containerViewStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={`Facebook`}
          />
          <Button
            icon={{ name: 'mail' }}
            onPress={() => this.props.navigation.navigate('Signup')}
            containerViewStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={'E-mail'}
          />
        </View>
        {/* <ScrollView>
          <Text>{JSON.stringify(this.state.response, null, 2)}</Text>
        </ScrollView> */}
      </View>
    );
  }
}

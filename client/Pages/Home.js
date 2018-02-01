import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styles } from '../styles';
import { SecureStore } from 'expo';
import { Button } from 'react-native-elements';

export default class extends Component {
  state = { response: '' }

  async componentDidMount() {
    try {
      let token = await SecureStore.getItemAsync('fbToken');
      if (token) this.props.navigation.navigate('Pin');
    }
    catch (err) {
      console.log(err);
    }
  }

  login = async () => {
    const APP_ID = '414644268964862';
    const options = {
      permissions: ['public_profile', 'email'],
    }
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, options);
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      this.setState({ response });
      const fbToken = response.url;
      const fbExpiration = response.headers.map.expires.toString();
      const fbId = JSON.parse(response._bodyInit).id;
      // Alert.alert('fbToken', `${typeof fbToken}`);
      // Alert.alert('fbExpiration', `${typeof fbExpiration}`);
      // Alert.alert('response', await response.json());
      await SecureStore.setItemAsync('fbId', fbId);
      await SecureStore.setItemAsync('fbToken', fbToken);
      await SecureStore.setItemAsync('fbExpiration', fbExpiration);
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

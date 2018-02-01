import React, { Component } from 'react';
import { Text, View, Button, Alert, ScrollView } from 'react-native';
import { styles } from '../styles';
import { SecureStore } from 'expo';

export default class extends Component {
  state = { response: '' }

  login = async () => {
    const APP_ID = '414644268964862';
    const options = {
      permissions: ['public_profile', 'email'],
    }
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, options);
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      this.setState({ response })
      // const fbToken = response.etag
      const fbExpiration = response.expires
      const fbId = JSON.parse(response._bodyInit).id
      // Alert.alert('response', await response.json());
      // this.props.navigation.navigate('Pin');
      await SecureStore.setItemAsync('fbId', fbId);
      // Alert.alert('fbId', `${fbId}`)
      this.props.navigation.navigate('Pin');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login With</Text>
        <Button
          title='FACEBOOK'
          color='black'
          onPress={() => this.login()}
        />
        <Button
          title='E-MAIL'
          color='black'
          onPress={() => this.props.navigation.navigate('Signup')}
        />
        {/* <ScrollView>
          <Text>{JSON.stringify(this.state.response, null, 2)}</Text>
        </ScrollView> */}
      </View>
    );
  }
}

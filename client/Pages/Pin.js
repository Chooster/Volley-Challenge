import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { styles } from '../styles';
import { SecureStore } from 'expo';

export default class extends Component {
  state = { loading: true, loaded: false, volleyId: '', pin: '', response: '', paired: '' }

  async componentDidMount() {
    try {
      let userId
      try {
        userId = await SecureStore.getItemAsync('fbId');
        Alert.alert('user', `${userId}`);
      }
      catch (err) {
        Alert.alert('error', `${err}`);
      }
      let response = await fetch('https://bciiecup19.execute-api.us-east-1.amazonaws.com/testing/volley-linking-service', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          call: 'servePin',
          fbId: userId
        }),
      });
      let responseJson = await response.json();
      this.setState({
        volleyId: responseJson.volleyId,
        pin: responseJson.pin,
        loading: false,
        loaded: true
      });
      this.setState({ response: responseJson });
    }
    catch (error) {
      Alert.alert(
        'Error',
        'Couldn\'t fetch PIN'
      );
    }
  }

  fetchPair = async () => {
    try {
      let paired = await fetch('https://mywebsite.com/mydata.json')
      Alert.alert('test', `${paired}`)
      return paired
    }
    catch (error) {
      Alert.alert('error', `${error}`)
    }
  }

  pollVolley = () => {
    setTimeout(() => {
      let paired = this.fetchPair()
      // paired = Object.entries(paired)[1]
      this.setState({ paired })
    }, 5000)
    return this.state.paired
  }

  render() {
    const { loading, loaded, response, volleyId, pin, paired } = this.state;
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(response, null, 2)}</Text>
        <Text>{pin}</Text>
        <Text>Paired: {JSON.stringify(this.pollVolley(), null, 2)}</Text>
        <Text>{loading ? 'Loading...' : 'Loaded'}</Text>
      </View>
    );
  }
}

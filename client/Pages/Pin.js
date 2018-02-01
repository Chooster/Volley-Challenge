import React, { Component } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { styles } from '../styles';
import { SecureStore } from 'expo';

export default class extends Component {
  state = { loading: true, loaded: false, volleyId: '', pin: '', response: '', paired: '' }

  async componentDidMount() {
    try {
      let userId
      try {
        userId = await SecureStore.getItemAsync('fbId');
        // Alert.alert('user', `${userId}`);
      }
      catch (err) {
        Alert.alert('User Error', `${err}`);
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
        response: responseJson,
        volleyId: responseJson.volleyId,
        pin: responseJson.pin,
        loading: false,
        loaded: true,
      });
    }
    catch (error) {
      Alert.alert(
        'Error',
        'Couldn\'t fetch PIN'
      );
    }
  }

  fetchPair = async () => {
    const { volleyId, pin } = this.state;
    try {
      let response = await fetch(`https://s3.amazonaws.com/volley-linking-api/${volleyId}`);
      let responseJson = await response.json();
      this.setState({ paired: `${responseJson[pin]}` })
      // Alert.alert('paired', `${this.state.paired}`)
    }
    catch (error) {
      Alert.alert('Fetch Error', `${error}`)
    }
  }

  poll = () => {
    setTimeout(() => {
      this.fetchPair()
    }, 5000)
  }

  render() {
    const { loading, loaded, response, pin, paired } = this.state;
    return (
      <View style={styles.container}>
        {paired ? null : this.poll()}
        <Text>Pin: {pin}</Text>
        <Text>Paired: {paired}</Text>
        <Text>{loading ? 'Loading...' : 'Loaded'}</Text>
        <Button
          title='Change User'
          onPress={() => this.props.navigation.navigate('Home')}
          color='black'
        />
      </View>
    );
  }
}

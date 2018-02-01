import React, { Component } from 'react';
import { Text, TextInput, View, Alert } from 'react-native';
import { styles } from '../styles';
import { SecureStore } from 'expo';
import { Button } from 'react-native-elements';

export default class extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  clearCreds = () => {
    this.setState({
      email: '',
      password: '',
    })
  }

  handleLogin = async () => {
    const { email, password, firstName, lastName } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (firstName.length < 2 || lastName.length < 2) {
      Alert.alert(
        'Error',
        'First and Last Name must be more than 1 character'
      );
    }
    else if (!reg.test(this.state.email)) {
      Alert.alert(
        'Error',
        'Invalid E-mail Address'
      );
      this.clearCreds();
    }
    else if (password.length < 8) {
      Alert.alert(
        'Error',
        'Password must be 8 characters long'
      );
      this.clearCreds();
    }
    else {
      await SecureStore.setItemAsync('userEmail', this.state.email);
      this.props.navigation.navigate('Pin');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { width: '49%' }]}
              onChangeText={(firstName) => this.setState({ firstName })}
              placeholder='First Name'
              value={this.state.firstName}
              />
              <TextInput
                style={[styles.input, { width: '49%' }]}
                onChangeText={(lastName) => this.setState({ lastName })}
                placeholder='Last Name'
                value={this.state.lastName}
              />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
            placeholder='E-mail'
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
            placeholder='Password'
            value={this.state.password}
            secureTextEntry={true}
          />
        </View>
        <Button
          title='Login'
          icon={{ name: 'https' }}
          buttonStyle={styles.button}
          onPress={() => this.handleLogin()}
        />
      </View>
    );
  }
}

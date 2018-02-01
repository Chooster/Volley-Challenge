import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { styles } from '../styles';

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

  handleLogin = () => {
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
      this.props.navigation.navigate('Pin');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <View style={styles.row}>
          <TextInput
            onChangeText={(firstName) => this.setState({ firstName })}
            placeholder='First Name'
            value={this.state.firstName}
          />
          <TextInput
            onChangeText={(lastName) => this.setState({ lastName })}
            placeholder='Last Name'
            value={this.state.lastName}
          />
        </View>
        <TextInput
          onChangeText={(email) => this.setState({ email })}
          placeholder='E-mail'
          value={this.state.email}
        />
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          placeholder='Password'
          value={this.state.password}
          secureTextEntry={true}
        />
        <Button
          title='Login'
          color='black'
          onPress={() => this.handleLogin()}
        />
      </View>
    );
  }
}

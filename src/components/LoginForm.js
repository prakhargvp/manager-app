import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

import { Card, CardItem, Input, Button } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
      if (this.props.error) {
        return (
          <View style={{ backgroundColor: 'white' }}>
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
          </View>
        );
      }
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardItem>
        <CardItem>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardItem>
        {this.renderError()}
        <CardItem>
          <Button onPress={this.onButtonPress.bind(this)}>
            Login
          </Button>
        </CardItem>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error
  };
};
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);

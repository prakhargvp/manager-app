import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textWithoutEncoding } from 'react-native-communications';
import { Card, CardItem, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false };
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }
  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }
  onTextPress() {
    const { phone, shift } = this.props;
    textWithoutEncoding(phone, `Your Upcoming Shift is on ${shift}`);
  }
  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }
  onDecline() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardItem>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardItem>

        <CardItem>
          <Button onPress={this.onTextPress.bind(this)}>
             Text Schedule
          </Button>
        </CardItem>

        <CardItem>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardItem>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
   employeeUpdate,
   employeeSave,
   employeeDelete
 })(EmployeeEdit);

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { ModalHeader, ModalBody, ModalFooter, Button, Modal } from "reactstrap";
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address:''
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      // reset state
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: ''
      })
    })
  }
  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    //=> bad code
    // this.state[id] = event.target.value;
    // this.setState({
    //   ...this.state,
    // },()=>{console.log(this.state)})
    //=> good code
    let coppyState = { ...this.state };
    coppyState[id] = event.target.value;
    this.setState({ ... coppyState })
  };

  checkValidateInput = () => {
    const arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('missing fields' + arrInput[i])
        break;
      }
    }
    return isValid;
  }

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
        // call Api create user
      this.props.createNewUser(this.state);
    }
  }



  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create A New User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => this.handleOnChangeInput(event, "password")}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>FirstName</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>LastName</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="px-3" color="primary" onClick={()=>this.handleAddNewUser()}>Add New</Button>
          <Button className="px-3" color="warning" onClick={() => this.toggle()}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

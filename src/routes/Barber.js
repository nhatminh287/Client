import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageSchedule from "../containers/System/Barber/ManageSchedule";
import Header from '../containers/Header/Header';
import ManageCustomer from "../containers/System/Barber/ManageCustomer";

class Barber extends Component {
  render() {
    const {isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header/>}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/barber/manage-schedule" component={ManageSchedule} />
              <Route path="/barber/manage-customer" component={ManageCustomer} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Barber);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageBarber from "../containers/System/Admin/ManageBarber";
import ManageHairstyle from '../containers/System/Hairstyle/ManageHairstyle'
import ManageBarbershop from '../containers/System/Barbershop/ManageBarbershop';
import EditHairstyle from "../containers/System/Hairstyle/EditHairstyle";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-barber" component={ManageBarber} />
              <Route path="/system/add-hairstyle" component={ManageHairstyle} />
              <Route path="/system/edit-hairstyle" component={EditHairstyle} />
              <Route path="/system/manage-barbershop" component={ManageBarbershop} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);

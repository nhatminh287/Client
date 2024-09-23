import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import HomePage from "./HomePage/HomePage";
import VerifyEmail from "./Customer/VerifyEmail";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";

import Login from "./Auth/Login";

import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import CustomScrollbars from "../components/CustomScrollbars";

import DetailBarber from "./Customer/Barber/DetailBarber";
import Barber from "../routes/Barber";
import DetailHairstyle from "./Customer/Hairstyle/DetailHairstyle";
import DetailBarbershop from "./Customer/Barbershop/DetailBarbershop"
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/barber/"}
                    component={userIsAuthenticated(Barber)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_BARBER} component={DetailBarber} />
                  <Route path={path.DETAIL_HAIRSTYLE} component={DetailHairstyle} />
                  <Route path={path.DETAIL_BARBERSHOP} component={DetailBarbershop} />
                  <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

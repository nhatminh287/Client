import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";
class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  async componentDidMount() {
   
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {}

  render() {
   
    return (
      <>
       
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);

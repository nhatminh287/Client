import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllBarbershop } from "../../../services/userService";
import { withRouter } from "react-router";
import './MedicalFacility.scss';
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBarbershops: [],
    };
  }
  async componentDidMount() {
    let res = await getAllBarbershop();
    if (res && res.errCode === 0) {
      this.setState({
        dataBarbershops: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailBarbershop = (barbershop) => {
    if (this.props.history) {
      this.props.history.push(`/detail-barbershop/${barbershop.id}`);
    }
  };

  render() {
    let { dataBarbershops } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
            <FormattedMessage id="homepage.outstanding-barbershop" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataBarbershops &&
                dataBarbershops.length > 0 &&
                dataBarbershops.map((item, index) => {
                  return (
                    <div
                      className="section-customize barbershop-child"
                      key={index}
                      onClick={() => this.handleViewDetailBarbershop(item)}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="barbershop-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);

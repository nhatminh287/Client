import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllHairstyle } from "../../../services/userService";
import "./Hairstyle.scss";
import { withRouter } from "react-router";

class Hairstyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHairstyle: [],
    };
  }
  async componentDidMount() {
    let res = await getAllHairstyle();
    if (res && res.errCode === 0) {
      this.setState({
        dataHairstyle: res.data ? res.data : [],
      });
    }
    try {
      let res = await getAllHairstyle();
      console.log("Hairstyle Data:", res);
      if (res && res.errCode === 0) {
        this.setState({
          dataHairstyle: res.data ? res.data : [],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  handleViewDetailHairstyle = (hairstyle) => {
    if (this.props.history) {
      this.props.history.push(`/detail-hairstyle/${hairstyle.id}`);
    }
  };

  render() {
    let { dataHairstyle } = this.state;
    return (
      <div className="section-share section-hairstyle">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.hairstyle-popular" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataHairstyle &&
                dataHairstyle.length > 0 &&
                dataHairstyle.map((item, index) => {
                  return (
                    <div
                      className="section-customize hairstyle-child"
                      key={index}
                      onClick={() => this.handleViewDetailHairstyle(item)}
                    >
                      <div
                        className="bg-image section-hairstyle"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="hairstyle-name">{item.name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(Hairstyle)
);

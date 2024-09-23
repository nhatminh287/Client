import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import {withRouter} from 'react-router';

class OutStandingBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBarbers: [],
    };
  }

  componentDidMount() {
    this.props.loadTopBarbers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topBarbersRedux !== this.props.topBarbersRedux) {
      this.setState({
        arrBarbers: this.props.topBarbersRedux,
      });
    }
  }

  handleViewDetailBarber=(barber)=>{
      if(this.props.history){
          this.props.history.push(`/detail-barber/${barber.id}`);
      }
}

  render() {
    let arrBarbers = this.state.arrBarbers;
    if (arrBarbers.length < 5) {
      arrBarbers = arrBarbers.concat(arrBarbers).concat(arrBarbers);
    }
    let { language } = this.props;
    return (
      <div className="section-share section-outstanding-barber">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-barber" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrBarbers &&
                arrBarbers.length > 0 &&
                arrBarbers.map((item, index) => {
                  let nameVi = `${item.lastName} ${item.firstName} `;
                  let nameEn = `${item.firstName} ${item.lastName}`;

                  // let imageBase64 = "";
                  // if (item.image) {
                  //   imageBase64 = new Buffer(item.image, "base64").toString(
                  //     "binary"
                  //   );
                  // }
                  return (
                    <div className="section-customize" key={index} onClick={()=>this.handleViewDetailBarber(item)}>
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-barber"
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          
                        </div>
                      </div>
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
    topBarbersRedux: state.admin.topBarbers,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopBarbers: () => dispatch(actions.fetchTopBarber()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingBarber));

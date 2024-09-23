import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileBarber.scss";
import { getProfileBarberById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from 'react-router-dom';
class ProfileBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInforBarber(this.props.barberId);
    console.log("data dcotor: ", data);
    console.log ("image: ", data.image);
    this.setState({
      dataProfile: data,
    });
  }

  getInforBarber = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileBarberById(id);
      console.log("res :", res);
      if (res && res.errCode === 0) {
        result = res.data;
        console.log("result :", result);
      }
    }

    return result;
  };

  componentDidUpdate(prevProps, PrevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.barberId !== prevProps.barberId) {
    }
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return (
        <>
          <div>{` ${time} - ${date} `}</div>
          <div>
            <FormattedMessage id="customer.booking-modal.priceBooking" />
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  render() {
    let { dataProfile } = this.state;    
    let {
      language,
      isShowDescriptionBarber,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      barberId
    } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.lastName} ${dataProfile.firstName} `;
      nameEn = `${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-barber-container">
        <div className="intro-barber">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : "https://i.ytimg.com/vi/rjTsqr-Ahkk/maxresdefault.jpg"
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionBarber ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-barber">
            <Link to={`/detail-barber/${barberId}`}>Xem Thêm</Link>
          </div>
        )}
        {isShowPrice && (
          <div className="price">
            <FormattedMessage id="customer.extra-infor-barber.price" />
            {dataProfile &&
            dataProfile.Barber_Infor &&
            language === LANGUAGES.VI ? (
              <NumberFormat
                className="currency"
                value={dataProfile.Barber_Infor.priceTypeData.valueVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND "}
              />
            ) : (
              ""
            )}
            {dataProfile &&
            dataProfile.Barber_Infor &&
            language === LANGUAGES.EN ? (
              <NumberFormat
                className="currency"
                value={dataProfile.Barber_Infor.priceTypeData.valueEn}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" USD "}
              />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBarber);

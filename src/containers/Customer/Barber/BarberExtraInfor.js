import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInforBarberById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import "./BarberExtraInfor.scss";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

class BarberExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {
    if (this.props.barberIdFromParent) {
        let res = await getExtraInforBarberById(this.props.barberIdFromParent);
        if (res && res.errCode == 0) {
          this.setState({
            extraInfor: res.data,
          });
        }
    }
  }

  async componentDidUpdate(prevProps, PrevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.barberIdFromParent !== prevProps.barberIdFromParent) {
      let res = await getExtraInforBarberById(this.props.barberIdFromParent);
      if (res && res.errCode == 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    return (
      <div className="barber-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="customer.extra-infor-barber.text-address" />
          </div>
          <div className="name-barbershop">
            {extraInfor && extraInfor.nameBarbershop ? extraInfor.nameBarbershop : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressBarbershop
              ? extraInfor.addressBarbershop
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              <FormattedMessage id="customer.extra-infor-barber.price" />
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={extraInfor.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={extraInfor.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
              <span
                className="detail"
                onClick={() => this.showHideDetailInfor(true)}
              >
                <FormattedMessage id="customer.extra-infor-barber.detail" />
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="customer.extra-infor-barber.price" />
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="customer.extra-infor-barber.price" />
                  </span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className="currency"
                          value={extraInfor.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          className="currency"
                          value={extraInfor.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="customer.extra-infor-barber.payment" />
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData.valueVi
                  : ""}
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.EN
                  ? extraInfor.paymentTypeData.valueEn
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  <FormattedMessage id="customer.extra-infor-barber.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BarberExtraInfor);

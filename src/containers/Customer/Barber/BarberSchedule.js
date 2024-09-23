import React, { Component } from "react";
import { connect } from "react-redux";
import "./BarberSchedule.scss";
import { LANGUAGES } from "../../../utils/constant";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleBarberByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from './Modal/BookingModal'
class BarberSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal:{}
    };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } // upercase first letter in date select

  getArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          object.label = "Hôm Nay " + moment(new Date()).format("DD/MM");
        } else {
          object.label = this.capitalizeFirstLetter(
            moment(new Date()).add(i, "days").format("dddd - DD/MM")
          );
        }
      } else {
        if (i === 0) {
          object.label = "To Day " + moment(new Date()).format("DD/MM");
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    return arrDate;
  };

  async componentDidMount() {
    let arrDate = this.getArrDays(this.props.language);
    if (this.props.barberIdFromParent) {
       let res = await getScheduleBarberByDate(
         this.props.barberIdFromParent,
         arrDate[0].value
      );
      this.setState({
        allDays: arrDate,
        allAvailableTime: res.data ? res.data : [],
      });
    } 
    this.setState({
      allDays: arrDate,
    });
  }
  async componentDidUpdate(prevProps, PrevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let arrDate = this.getArrDays(this.props.language);
      this.setState({
        allDays: arrDate,
      });
    }
    if (prevProps.barberIdFromParent !== this.props.barberIdFromParent) {
      let arrDate = this.getArrDays(this.props.language);
      let res = await getScheduleBarberByDate(
        this.props.barberIdFromParent,
        arrDate[0].value
      );
      this.setState({
        allDays: arrDate,
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnChangeSelect = async (e) => {
    if (this.props.barberIdFromParent && this.props.barberIdFromParent !== -1) {
      let barberId = this.props.barberIdFromParent;
      let date = e.target.value;
      let res = await getScheduleBarberByDate(barberId, date);
      if (res && res.errCode == 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  }
  closeModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  }

  render() {
    let { allDays, allAvailableTime, isOpenModalBooking,dataScheduleTimeModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="barber-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleOnChangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="customer.detail-barber.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {                      
                    allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={
                            language === LANGUAGES.VI ? "btn-vie" : "btn-en"
                          }
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="customer.detail-barber.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="customer.detail-barber.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  <b>
                    <FormattedMessage id="customer.detail-barber.no-schedule" />
                  </b>
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeModal}
          dataTime={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(BarberSchedule);

import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileBarber from "../ProfileBarber";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postCustomerBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      genders: "",
      barberId: "",
      timeType: "",
      isShowLoading:false
    };
  }
  async componentDidMount() {
    this.props.getGenders();
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        this.setState({
          barberId: this.props.dataTime.barberId,
          timeType: this.props.dataTime.timeType,
        });
      }
    }
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  handleOnChangeInput = (event, name) => {
    let copyState = { ...this.state };
    copyState[name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  buildTimeBooking = (dataTime) => {
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
      return ` ${time} - ${date} `
    } 
    return '';
  };

  buildBarberName = (dataTime) => {
    console.log('data time la gi: ', dataTime);
    let { language } = this.props;
    console.log('in ra language: ', language);
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.barberData.lastName}${dataTime.barberData.firstName}`
          : `${dataTime.barberData.firstName}${dataTime.barberData.lastName}`;
      return name;
    }
    return "";
  }


  handleConfirmBooking = async () => {
    
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let barberName = this.buildBarberName(this.props.dataTime);
    this.setState({
      isShowLoading: true
    })
    let res = await postCustomerBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday:date,
      selectedGender: this.state.selectedGender.value,
      genders: this.state.genders,
      barberId: this.state.barberId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      barberName: barberName,
    });
    this.setState({
      isShowLoading:false
    })
    if (res && res.errCode === 0) {
      toast.success("Booking a new Appointment success!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking a new Appointment error!");
    }
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let barberId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      barberId = dataTime.barberId;
    }
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        centered
        size="lg"
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="customer.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="barber-infor">
              <ProfileBarber
                barberId={barberId}
                isShowDescriptionBarber={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.fullName" />
                </label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(e) => this.handleOnChangeInput(e, "fullName")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(e) => this.handleOnChangeInput(e, "reason")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.birthday" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  options={this.state.genders}
                  onChange={this.handleChangeSelect}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="customer.booking-modal.btnConfirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="customer.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
        </Modal>
      </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

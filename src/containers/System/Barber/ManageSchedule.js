import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { saveBulkScheduleBarber } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBarbers: [],
      selectedBarber: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllBarbers();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allBarbers !== this.props.allBarbers) {
      let dataSelect = this.buildDataInputSelect(this.props.allBarbers);
      this.setState({
        listBarbers: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      data = data.map((item) => {
        item.isSelected = false;
        return item;
      });
      this.setState({
        rangeTime: data,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChange = async (selectedOption) => {
    this.setState({
      selectedBarber: selectedOption,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      let newrangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      this.setState({
        rangeTime: newrangeTime,
      });
    }
  };

  handleSaveSchedule = async() => {
    let { rangeTime, selectedBarber, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("You Havent selected Date");
      return;
    }
    if (!selectedBarber && _.isEmpty(selectedBarber)) {
      toast.error("You Havent selected Barber");
      return;
    }
    let formattedDate = new Date (currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.barberId = selectedBarber.value;
          object.date = formattedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
        let res = await saveBulkScheduleBarber({
          arrSchedule: result,
          barberId: selectedBarber.value,
          formattedDate:formattedDate,
        });
        if (res && res.errCode === 0) {
          toast.success("save schedule successfull");
        } else {
          toast.error("error save bulk schedule barber");
        }
      } else {
        toast.error("You Havent selected Time ");
        return;
      }
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-barber" />
              </label>
              <Select
                value={this.state.selectedBarber}
                onChange={this.handleChange}
                options={this.state.listBarbers}
              />
            </div>
            <div className="col-6">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allBarbers: state.admin.allBarbers,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBarbers: () => dispatch(actions.fetchAllBarbers()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

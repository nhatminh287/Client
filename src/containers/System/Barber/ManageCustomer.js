import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageCustomer.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllCustomerForBarber,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataCustomer: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.getDataCustomer();
  }

  getDataCustomer = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllCustomerForBarber({
      barberId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataCustomer: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, PrevState, snapshot) {}

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataCustomer();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      barberId: item.barberId,
      customerId: item.customerId,
      email: item.customerData.email,
      timeType: item.timeType,
      customerName: item.customerData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataFromModal) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true
    })
    let res = await postSendRemedy({
      email: dataFromModal.email,
      imgBase64: dataFromModal.imgBase64,
      barberId: dataModal.barberId,
      customerId: dataModal.customerId,
      timeType: dataModal.timeType,
      customerName: dataModal.customerName,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading:false
      })
      toast.success("Send Remedy success");
      await this.getDataCustomer();
      this.closeRemedyModal();
    } else {
      toast.error("Send Remedy error !!!");
    }
  };

  render() {
    let { dataCustomer, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-customer-container">
            <div className="m-p-title">Quản Lý Khách Hàng Đặt Lịch</div>
            <div className="manage-customer-body row">
              <div className="col-4 form-group">
                <label>Chọn Ngày</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-customer">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời Gian</th>
                      <th>Họ Và Tên</th>
                      <th>Địa Chỉ</th>
                      <th>Giới Tính</th>
                      <th>Actions</th>
                    </tr>
                    {dataCustomer && dataCustomer.length > 0 ? (
                      dataCustomer.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataCustomer.valueVi
                            : item.timeTypeDataCustomer.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.customerData.genderData.valueVi
                            : item.customerData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.customerData.firstName}</td>
                            <td>{item.customerData.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác Nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);

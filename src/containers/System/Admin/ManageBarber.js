import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

////////////////////////////////
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./ManageBarber.scss";
import Select from "react-select";
import { getDetailInforBarber } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils/constant";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
class ManageBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedBarber: "",
      description: "",
      listBarbers: [],
      hasOldData: false,
      action: "",

      //save to barber_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedProvince: "",
      selectedPayment: "",
      nameBarbershop: "",
      addressBarbershop: "",
      note: "",

      listBarbershop: [],
      listHairstyle: [],
      barbershopId: "",
      hairstyleId: "",
      selectBarbershop: "",
      selectHairstyle: "",
    };
  }
  async componentDidMount() {
    this.props.fetchAllBarbers();
    this.props.getAllRequiredBarberInfor();
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === 'HAIRSTYLE') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
         })
      }
      if (type === 'BARBERSHOP') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
         })
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allBarbers !== this.props.allBarbers) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allBarbers,
        "USERS"
      );
      this.setState({
        listBarbers: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allBarbers,
        "USERS"
      );
      let {
        resPrice,
        resPayment,
        resProvince,
      } = this.props.allRequiredBarberInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listBarbers: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (
      prevProps.allRequiredBarberInfor !== this.props.allRequiredBarberInfor
    ) {
      let {
        resPrice,
        resPayment,
        resProvince,
        resHairstyle,
        resBarbershop
      } = this.props.allRequiredBarberInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince,"PROVINCE");
      let dataSelectHairstyle = this.buildDataInputSelect(resHairstyle,'HAIRSTYLE');
      let dataSelectBarbershop = this.buildDataInputSelect(resBarbershop, "BARBERSHOP");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listHairstyle: dataSelectHairstyle,
        listBarbershop :dataSelectBarbershop
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleChange = async (selectedBarber) => {
    this.setState({ selectedBarber });

    let { listPrice, listPayment, listProvince, listHairstyle ,listBarbershop} = this.state;

    let res = await getDetailInforBarber(selectedBarber.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressBarbershop = "",
        nameBarbershop = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        hairstyleId = '',
        barbershopId = '';
      let selectedPrice = "",
        selectedProvince = "",
        selectedPayment = "",
        selectedHairstyle = '',
        selectedBarbershop =''
      

      if (res.data.Barber_Infor) {
        addressBarbershop = res.data.Barber_Infor.addressBarbershop;
        nameBarbershop = res.data.Barber_Infor.nameBarbershop;
        note = res.data.Barber_Infor.note;
        paymentId = res.data.Barber_Infor.paymentId;
        priceId = res.data.Barber_Infor.priceId;
        provinceId = res.data.Barber_Infor.provinceId;
        hairstyleId = res.data.Barber_Infor.hairstyleId;
        barbershopId = res.data.Barber_Infor.barbershopId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedHairstyle = listHairstyle.find((item) => {
          return item && item.value === hairstyleId;
        })
        selectedBarbershop = listBarbershop.find((item) => {
          return item && item.value === barbershopId;
        })
      }
      this.setState({
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldData: true,
        addressBarbershop: addressBarbershop,
        nameBarbershop: nameBarbershop,
        note: note,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedPrice: selectedPrice,
        selectHairstyle: selectedHairstyle,
        selectBarbershop: selectedBarbershop,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
        addressBarbershop: "",
        nameBarbershop: "",
        note: "",
        selectHairstyle: "",

        selectedPayment: "",
        selectedProvince: "",
        selectedPrice: "",
        selectBarbershop:""
      });
    }
  };

  handleChangeSelectBarberInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailBarber({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      barberId: this.state.selectedBarber.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedProvince: this.state.selectedProvince.value,
      selectedPayment: this.state.selectedPayment.value,
      nameBarbershop: this.state.nameBarbershop,
      addressBarbershop: this.state.addressBarbershop,
      note: this.state.note,
      barbershopId:this.state.selectBarbershop && this.state.selectBarbershop.value ? this.state.selectBarbershop.value : "",
      hairstyleId: this.state.selectHairstyle.value,
    });
     this.setState({
       contentMarkdown: "",
       contentHTML: "",
       description: "",
       hasOldData: false,
       addressBarbershop: "",
       nameBarbershop: "",
       note: "",
       selectHairstyle: "",
       selectedPayment: "",
       selectedProvince: "",
       selectedPrice: "",
       selectBarbershop:""
     });
  };

  handleOnChangeText = (e, name) => {
    let stateCopy = { ...this.state };
    stateCopy[name] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let {
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
      listHairstyle,
    } = this.state;
    return (
      <div className="manage-barber-container">
        <div className="manage-barber-title">
          <FormattedMessage id="admin.manage-barber.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.select-barber" />
            </label>
            <Select
              value={this.state.selectedBarber}
              onChange={this.handleChange}
              options={this.state.listBarbers}
              placeholder={
                <FormattedMessage id="admin.manage-barber.select-barber" />
              }
            />
          </div>
          <div className="content-right form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.intro" />
            </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(e) => this.handleOnChangeText(e, "description")}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectBarberInfor}
              options={listPrice}
              placeholder={<FormattedMessage id="admin.manage-barber.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectBarberInfor}
              options={listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-barber.payment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectBarberInfor}
              options={listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-barber.province" />
              }
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.nameBarbershop" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, "nameBarbershop")}
              value={this.state.nameBarbershop}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.addressBarbershop" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, "addressBarbershop")}
              value={this.state.addressBarbershop}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.note" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.hairstyle" />
            </label>
            <Select
              value={this.state.selectHairstyle}
              onChange={this.handleChangeSelectBarberInfor}
              options={this.state.listHairstyle}
              placeholder={
                <FormattedMessage id="admin.manage-barber.hairstyle" />
              }
              name="selectHairstyle"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.select-barbershop" />
            </label>
            <Select
              value={this.state.selectBarbershop}
              onChange={this.handleChangeSelectBarberInfor}
              options={this.state.listBarbershop}
              placeholder={
                <FormattedMessage id="admin.manage-barber.select-barbershop" />
              }
              name="selectBarbershop"
            />
          </div>
        </div>
        <div className="manage-barber-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData ? "save-content-barber" : "create-content-barber"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData ? (
            <span>
              <FormattedMessage id="admin.manage-barber.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-barber.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allBarbers: state.admin.allBarbers,
    language: state.app.language,
    allRequiredBarberInfor: state.admin.allRequiredBarberInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBarbers: () => dispatch(actions.fetchAllBarbers()),
    getAllRequiredBarberInfor: () => dispatch(actions.getRequiredBarberInfor()),
    saveDetailBarber: (data) => dispatch(actions.saveDetailBarber(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBarber);

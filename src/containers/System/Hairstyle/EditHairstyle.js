import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageHairstyle.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import CommonUtils from "../../../utils/CommonUtils";
import { createNewHairstyle } from '../../../services/userService';
import { getAllHairstyle } from "../../../services/userService";
import { editHairstyle } from "../../../services/userService";

import { toast } from 'react-toastify';
import Select from "react-dropdown-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class EditHairstyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHairstyle: [],
      id: "",
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
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
  componentDidUpdate(prevProps, PrevState, snapshot) {}
  handleOnchangeInput = (e, name) => {
    let stateCopy = { ...this.state };
    stateCopy[name] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
    handleSaveHairstyle = async() => {
        let res = await editHairstyle(this.state);
        if (res && res.errCode === 0) {
            toast.success("update hairstyle success !")
            this.setState({
            id: "",
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            });
        } else {
            toast.error("seem some thing wrong !");
        }
    };
    handleOnchangeSelected = async(values) => {
        if (values){
            console.log('Selected values:', values);
        this.setState({
            id: values.id,
            name: values.name,
            imageBase64: values.image,
            descriptionHTML: values.descriptionHTML,
            descriptionMarkdown: values.descriptionMarkdown,
        })
        }
    };

  render() {
    let dataHairstyle  = this.state.dataHairstyle;
    let id = this.state.id;
    return (
      <div className="manage-hairstyle-container">
        <div className="ms-title">Quản Lý Kiểu Tóc</div>
        <div className="ms-selected">
            <div className="col-6 form-group">
            <label>Chọn Kiểu Tóc</label>
            <Select options={dataHairstyle}  labelField="id" valueField="id" selectValues = {[id]} onChange={(values) => this.handleOnchangeSelected(...values)} multi={false} addPlaceholder="" />
          </div>
        </div>
        <div className="add-new-hairstyle row">
          <div className="col-6 form-group">
            <label>Tên Kiểu Tóc</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(e) => this.handleOnchangeInput(e, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh Kiểu Tóc</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(e) => this.handleOnChangeImage(e)}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-hairstyle"
              onClick={() => this.handleSaveHairstyle()}
            >
              Lưu
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditHairstyle);

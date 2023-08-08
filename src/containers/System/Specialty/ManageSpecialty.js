import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import CommonUtils from "../../../utils/CommonUtils";
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}
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
    handleSaveNewSpecialty = async() => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
          toast.success("add new specialty success !")
          this.setState({
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
          });
        } else {
            toast.error("seem some thing wrong !");
        }
  }

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản Lý Chuyên Khoa</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên Chuyên Khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(e) => this.handleOnchangeInput(e, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh Chuyên Khoa</label>
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
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

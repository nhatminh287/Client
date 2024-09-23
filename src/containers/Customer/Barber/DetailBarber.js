import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailBarber.scss";
import { getDetailInforBarber } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import BarberSchedule from "./BarberSchedule";
import BarberExtraInfor from "./BarberExtraInfor";

import LikeAndShare from '../../HomePage/SocialPlugin/LikeAndShare';
import Comment from '../../HomePage/SocialPlugin/Comment';

class DetailBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailBarber: {},
      currentBarberId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.setState({
        currentBarberId: this.props.match.params.id,
      });

      let res = await getDetailInforBarber(this.props.match.params.id);
      if (res && res.errCode == 0) {
        this.setState({
          detailBarber: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {}

  render() {
    let { detailBarber, currentBarberId } = this.state;
    let nameVi = "";
    let nameEn = "";
    let { language } = this.props;
    if (detailBarber && detailBarber.positionData) {
      nameVi = `${detailBarber.lastName} ${detailBarber.firstName} `;
      nameEn = `${detailBarber.firstName} ${detailBarber.lastName}`;
    }
    let currentURL =  process.env.REACT_APP_IS_LOCALHOST === 1
      ? "https://github.com/nhatminh287"
      : window.location.href;
      console.log(`currentURL`, currentURL);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="barber-detail-container">
          <div className="intro-barber">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailBarber && detailBarber.image ? detailBarber.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailBarber &&
                  detailBarber.Markdown &&
                  detailBarber.Markdown.description && (
                    <span>{detailBarber.Markdown.description}</span>
                  )}
                  <div className="like-share-plugin">
                  <LikeAndShare dataHref={currentURL} />
                </div>
              </div>
            </div>
          </div>
          <div className="schedule-barber">
            <div className="content-left">
              <BarberSchedule barberIdFromParent={currentBarberId} />
            </div>
            <div className="content-right">
              <BarberExtraInfor barberIdFromParent={currentBarberId} />
            </div>
          </div>
          <div className="detail-infor-barber">
            {detailBarber &&
              detailBarber.Markdown &&
              detailBarber.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailBarber.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-barber"> 
            <Comment dataHref={currentURL} width={'100%'} />
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBarber);

import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyen thong noi ve booking care
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/RlzrRVUotCo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Xông hơi là phương pháp phòng - trị bệnh theo Đông y, mồ hôi trong
              cơ thể sẽ thoát ra ngoài, cũng là cách để đẩy các khí độc gây bệnh
              ra khỏi cơ thể. Các loại thảo dược dùng để xông hơi đều chứa tinh
              dầu có tính kháng khuẩn, kháng viêm, giúp tinh thần thư giãn,
              thoải mái (yếu tố quan trọng giúp tăng cường sức đề kháng), đưa
              vào cơ thể những chất kháng khuẩn tự nhiên. Xông hơi giúp trẻ tăng
              đề kháng phòng bệnh, trong đó có Covid-19.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

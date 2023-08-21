import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          <FormattedMessage id="homepage.about"/>
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/FJFoitVArX8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
            Barbershop đơn giản là nơi cắt tóc làm đẹp cho đàn ông. Nhưng cũng không hoàn toàn đơn giản như thế, nó là một loại hình cắt tóc đã có từ rất lâu đời. Lâu đến mức người ta có thể tôn nó là một nền văn hoá dành cho các quý ông, văn hoá Barber.
            Đàn ông thời Hy Lạp cổ thường ghé qua các sạp trong chợ để được tỉa tót râu tóc, chăm sóc da, móng tay cũng như được bàn luận, tán gẫu mọi chuyện trên trời dưới bể. Kiểu dịch vụ dành cho các quý ông này sau đó bắt đầu lan rộng khắp châu Âu. Và từ đó, tiệm cắt tóc (barbershop) trở thành một địa điểm phải ghé qua hằng ngày của các quý ông.
            </p>
            <h2>Vậy Barber, họ là ai?</h2>
            <p>Barber là những người thợ cắt tóc. Hay đúng hơn là những người thợ chuyên cắt tạo kiểu tóc và râu cho nam giới. Nam giới có thể ẩn, hiện tính cách, triết lí sống của mình chỉ qua một kiểu tóc. Một thứ kì diệu như vậy không thể và chẳng ai muốn phó mặc cho những người thợ học việc hoặc một người thợ tồi.</p>
            <h2>Trào lưu Barbershop tại Việt Nam</h2>
            <p>Khi du nhập vào Việt Nam với một trong những kiểu tóc cực hot, Undercut, thì các barber shop mọc lên nhiều hơn. Tuy vậy, các barber shop không có quá nhiều sự khác biệt so với salon tóc. Cũng bởi nhu cầu và văn hoá Việt Nam khác biệt so với các đất nước phương Tây.</p>
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

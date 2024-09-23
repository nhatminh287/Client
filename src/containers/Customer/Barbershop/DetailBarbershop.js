import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailBarbershop.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import BarberSchedule from "../Barber/BarberSchedule";
import BarberExtraInfor from "../Barber/BarberExtraInfor";
import ProfileBarber from "../Barber/ProfileBarber";
import {
  getDetailBarbershopById,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailBarbershop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBarberId: [],
      dataDetailBarbershop: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailBarbershopById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrayBarberId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.barberBarbershop;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrayBarberId.push(item.barberId);
            });
          }
        }

        this.setState({
          dataDetailBarbershop: res.data,
          arrBarberId: arrayBarberId,
        });
      }
    }
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {}

  render() {
    let { arrBarberId, dataDetailBarbershop } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-hairstyle-container">
        <HomeHeader />
        <div className="detail-hairstyle-body">
          <div className="description-hairstyle">
            {dataDetailBarbershop && !_.isEmpty(dataDetailBarbershop) && (
              <>
                <div className="name-detail-barbershop">{dataDetailBarbershop.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailBarbershop.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>
          {arrBarberId &&
            arrBarberId.length > 0 &&
            arrBarberId.map((item, index) => {
              return (
                <div className="each-barber" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-barber">
                      <ProfileBarber
                        barberId={item}
                        isShowDescriptionBarber={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="barber-schedule">
                      <BarberSchedule barberIdFromParent={item} />
                    </div>
                    <div className="barber-extra-infor">
                      <BarberExtraInfor barberIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBarbershop);

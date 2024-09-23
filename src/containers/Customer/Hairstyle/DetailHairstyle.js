import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailHairstyle.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import BarberSchedule from "../Barber/BarberSchedule";
import BarberExtraInfor from "../Barber/BarberExtraInfor";
import ProfileBarber from "../Barber/ProfileBarber";
import {
  getDetailHairstyleById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailHairstyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBarberId: [],
      dataDetailHairstyle: {},
      listProvince: [],
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailHairstyleById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrayBarberId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.barberHairstyle;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrayBarberId.push(item.barberId);
            });
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "All Province",
            valueVi: "Toàn Quốc",
          });
        }
        this.setState({
          dataDetailHairstyle: res.data,
          arrBarberId: arrayBarberId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {}

  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      //
       let res = await getDetailHairstyleById({
         id: id,
         location: location,
       });
       console.log("res: ", res);
       if (res && res.errCode === 0 ) {
         let data = res.data;
         console.log("data of getDetailHairstyleById", data);
         let arrayBarberId = [];
         if (data && !_.isEmpty(data)) {
           let arr = data.barberHairstyle;
           if (arr && arr.length > 0) {
             arr.map((item) => {
               arrayBarberId.push(item.barberId);
             });
           }
         }
         this.setState({
           dataDetailHairstyle: res.data,
           arrBarberId: arrayBarberId,
         });
      }   
      //
    }
  };

  render() {
    let { arrBarberId, dataDetailHairstyle, listProvince } = this.state;
    let { language } = this.props;
    console.log("arrBarberId: ", arrBarberId);
    return (
      <div className="detail-hairstyle-container">
        <HomeHeader />
        <div className="detail-hairstyle-body">
          <div className="description-hairstyle">
            {dataDetailHairstyle && !_.isEmpty(dataDetailHairstyle) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailHairstyle.descriptionHTML,
                }}
              ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHairstyle);
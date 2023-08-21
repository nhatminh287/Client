import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllHandbook } from "../../../services/userService";
import Slider from "react-slick";

class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataHandbook: [],
        };
      }
      async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
          this.setState({
            dataHandbook: res.data ? res.data : [],
          });
        }
        try {
          let res = await getAllHandbook();
          console.log("Handbook Data:", res);
          if (res && res.errCode === 0) {
            this.setState({
              dataHandbook: res.data ? res.data : [],
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    render() {
        let { dataHandbook } = this.state;       
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.handbook"/></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-infor"/></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            
                            {dataHandbook &&
                                dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <a
                                        className="section-customize handbook-child"
                                        key={index}                                        
                                        href={item.link}
                                        target="_blank"
                                        >
                                        <div
                                            className="bg-image section-handbook"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className="handbook-name" style={{"font-weight": "bold","color": "black"}}>{item.description}</div>
                                        </a>
                                    );
                            })}
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);

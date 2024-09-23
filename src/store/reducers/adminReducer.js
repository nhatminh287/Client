import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  users: [],
  topBarbers: [],
  allBarbers: [],
  allScheduleTime: [],
  
  allRequiredBarberInfor:[]

};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      }; //
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      }; //
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      }; //
    case actionTypes.FETCH_TOP_BARBERS_SUCCESS:
      state.topBarbers = action.dataBarbers;
      return {
        ...state,
      }; //
    case actionTypes.FETCH_TOP_BARBERS_FAILED:
      state.topBarbers = [];
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ALL_BARBERS_SUCCESS:
      state.allBarbers = action.dataBarbers;
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ALL_BARBERS_FAILED:
      state.allBarbers = [];
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      }; //
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      }; //

    case actionTypes.FETCH_REQUIRED_BARBER_INFOR_SUCCESS:
      state.allRequiredBarberInfor = action.data;
      return {
        ...state,
      }; //
    case actionTypes.FETCH_REQUIRED_BARBER_INFOR_FAILED:
      state.allRequiredBarberInfor = [];
      return {
        ...state,
      }; //

    default:
      return state;
  }
};

export default adminReducer;

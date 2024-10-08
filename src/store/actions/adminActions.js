import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopBarberHomeService,
  getAllBarbers,
  saveDetailBarberService,
  getAllHairstyle,
  getAllBarbershop
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error", e);
    }
  };
};
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error", e);
    }
  };
};
//
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
//
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("CREATE USER SUCCEED");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed error", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: "CREATE_USER_SUCCESS",
});

export const saveUserFailed = () => ({
  type: "CREATE_USER_FAILED",
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsers error", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: "FETCH_ALL_USERS_SUCCESS",
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: "FETCH_ALL_USERS_FAILED",
});

//
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res) {
        toast.error("DELETE USER SUCCEED");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
////////////////////////////////
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res) {
        toast.warn("UPDATE USER SUCCEED");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(editUserFailed());
      }
    } catch (e) {
      dispatch(editUserFailed());
      console.log("editUserFailed error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

// let res1 = await getTopBarberHomeService('2');
export const fetchTopBarber = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopBarberHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_BARBERS_SUCCESS,
          dataBarbers: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_BARBERS_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch top barbers fails", e);
      dispatch({
        type: actionTypes.FETCH_TOP_BARBERS_FAILED,
      });
    }
  };
};
//
export const fetchAllBarbers = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllBarbers();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_BARBERS_SUCCESS,
          dataBarbers: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_BARBERS_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch all barbers fails", e);
      dispatch({
        type: actionTypes.FETCH_ALL_BARBERS_FAILED,
      });
    }
  };
};
//
export const saveDetailBarber = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailBarberService(data);
      if (res && res.errCode === 0) {
        toast.success("SAVE DETAILS BARBER SUCCEED!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_BARBER_SUCCESS,
          dataBarbers: res.data,
        });
      } else {
        toast.error("SAVE DETAILS BARBER ERROR!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_BARBER_FAILED,
        });
      }
    } catch (e) {
      toast.error("SAVE DETAILS BARBER ERROR!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_BARBER_FAILED,
      });
    }
  };
};
//
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch all schedules fails", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

/////////////

export const getRequiredBarberInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_BARBER_INFOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resHairstyle = await getAllHairstyle();
      let resBarbershop = await getAllBarbershop();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resHairstyle &&
        resHairstyle.errCode === 0 &&
        resBarbershop &&
        resBarbershop.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resHairstyle: resHairstyle.data,
          resBarbershop: resBarbershop.data,
        };
        dispatch(fetchRequiredBarberInforSuccess(data));
      } else {
        dispatch(fetchRequiredBarberInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredBarberInforFailed());
      console.log("fetch barber price error", e);
    }
  };
};
//
export const fetchRequiredBarberInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_BARBER_INFOR_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredBarberInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_BARBER_INFOR_FAILED,
});

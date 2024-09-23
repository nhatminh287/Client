import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};
const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put(`/api/edit-user`, inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopBarberHomeService = (limit) => {
  return axios.get(`/api/top-barber-home?limit=${limit}`);
}
const getAllBarbers = () => {
  return axios.get(`/api/get-all-barbers`);
}

const saveDetailBarberService = (data) => {
  return axios.post(`/api/save-infor-barbers`, data);
};

const getDetailInforBarber =(inputId)=>{
   return axios.get(`/api/get-detail-barber-by-id?id=${inputId}`);
}

const saveBulkScheduleBarber =(data)=>{
   return axios.post(`/api/bulk-create-schedule`,data);
}
const getScheduleBarberByDate =(barberId,date)=>{
  return axios.get(`/api/get-schedule-barber-by-date?barberId=${barberId}&date=${date}`);
}
const getExtraInforBarberById =(barberId)=>{
  return axios.get(`/api/get-extra-infor-barber-by-id?barberId=${barberId}`);
}
const getProfileBarberById =(barberId)=>{
  return axios.get(`/api/get-profile-barber-by-id?barberId=${barberId}`);
}
const postCustomerBookAppointment =(data)=>{
  return axios.post(`/api/customer-book-appointment`,data);
}
const postVerifyBookAppointment =(data)=>{
  return axios.post(`/api/verify-book-appointment`, data);
}
const createNewHairstyle =(data)=>{
  return axios.post(`/api/create-new-hairstyle`, data);
}
const editHairstyle =(data)=>{
  return axios.put(`/api/edit-hairstyle`, data);
}
const getAllHairstyle =()=>{
  return axios.get(`/api/get-all-hairstyle`);
}
const getDetailHairstyleById =(data)=>{
  return axios.get(`/api/get-detail-hairstyle-by-id?id=${data.id}&location=${data.location}`);
}
const createNewBarbershop = (data) => {
  return axios.post(`/api/create-new-barbershop`, data);
};

const getAllBarbershop = () => {
  return axios.get(`/api/get-barbershop`);
};

const getDetailBarbershopById = (data) => {
  return axios.get(`/api/get-detail-barbershop-by-id?id=${data.id}`);
};

const getAllCustomerForBarber = (data) => {
  return axios.get(`/api/get-list-customer-for-barber?barberId=${data.barberId}&date=${data.date}`);
};
const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`,data);
};

const getAllHandbook = () => {
  return axios.get(`/api/get-handbook`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopBarberHomeService,
  getAllBarbers,
  saveDetailBarberService,
  getDetailInforBarber,
  saveBulkScheduleBarber,
  getScheduleBarberByDate,
  getExtraInforBarberById,
  getProfileBarberById,
  postCustomerBookAppointment,
  postVerifyBookAppointment,
  createNewHairstyle,
  getAllHairstyle,
  getDetailHairstyleById,
  createNewBarbershop,
  getAllBarbershop,
  getDetailBarbershopById,
  getAllCustomerForBarber,
  postSendRemedy,
  getAllHandbook,
  editHairstyle,
};

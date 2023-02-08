import { BASE_URL, responseBody } from 'API/constants.js';
import axios from 'axios';
import { errorNotification } from 'components/alerts/Alerts.js';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'ngrok-skip-browser-warning': true },
});

// eslint-disable-next-line import/prefer-default-export
export const AdminAPIs = {
  createAdmin: () => instance
    .post(`${BASE_URL}/post/admin/new`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to Create Admin', err.response?.data?.error);
      console.log('error ->', err);
      return null;
    }),
  getAdmins: () => instance
    .get(`${BASE_URL}/get/admins`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to fetch admins', err.response?.data?.error);
      console.log(err);
    }),
  getAdminDayStarted: () => instance
    .get(`${BASE_URL}/get/admin/dayStarted`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to get info on day started by admin', err.response?.data?.error);
      console.log(err);
    }),
  getAdminDrivers: (adminId) => instance
    .get(`${BASE_URL}/get/admin/drivers?admin_id=${adminId}`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to fetch driver details', err.response?.data?.error);
      console.log(err);
    }),
  getAdminOutput: (adminId) => instance
    .get(`${BASE_URL}/get/admin/output?admin_id=${adminId}`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to fetch new destinations for all drivers', err.response?.data?.error);
      console.log(err);
    }),
  getStartMap: () => instance
    .get(`${BASE_URL}/get/admin/start`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to fetch driver routes', err.response?.data?.error);
      console.log(err);
    }),
  postAdminInput: (data) => instance
    .post(`${BASE_URL}/post/admin/input`, data)
    .then((res) => {
      console.log(res);
      return res?.data;
    })
    .catch((err) => {
      errorNotification('Error in posting input', err?.message);
      console.log(err);
      return null;
    }),
  postAdminStart: (adminId, hubNode) => instance
    .post(`${BASE_URL}/post/admin/start`, { admin_id: adminId, hub_node: hubNode })
    .then((res) => {
      console.log(res.data);
      return res?.data;
    })
    .catch((err) => {
      errorNotification('Failed to start day \n Please try again', err.response?.data?.error);
      console.log(err);
      return null;
    }),
  postRouteChange: (driverId, items) => instance
    .post(`${BASE_URL}/post/driver/reorder`, { driver_id: driverId, items })
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed updating route', err.response?.data?.error);
      console.log(err);
      return null;
    }),
  postAdminDynamicPoints: (data) => instance
    .post(`${BASE_URL}/post/admin/dynamicPoint`, data)
    .then((res) => res?.data)
    .catch((err) => {
      errorNotification('Failed to add new destination', err.response?.data?.error);
      console.log(err);
      return null;
    }),
  postDayEnd: (adminId) => instance
    .post(`${BASE_URL}/post/admin/end`, { admin_id: adminId })
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to end day', err.response?.data?.error);
      console.log(err);
      return null;
    }),
  deleteDestination: (driverId, destinationId) => instance
    .delete(`${BASE_URL}/delete/admin/dynamicPoints?driver_id=${driverId}&destination_id=${destinationId}`)
    .then((res) => res?.data)
    .catch((err) => {
      errorNotification('Failed to delete destination', err.response?.data?.error);
      console.log(err);
      return null;
    }),
};

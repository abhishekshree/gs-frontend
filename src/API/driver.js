import { BASE_URL, responseBody } from 'API/constants.js';
import axios from 'axios';
import { errorNotification } from 'components/alerts/Alerts.js';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'ngrok-skip-browser-warning': true },
});

// eslint-disable-next-line import/prefer-default-export
export const DriverAPIs = {
  getDriverPath: (driverId) => instance
    .get(`${BASE_URL}/get/driver/path?driver_id=${driverId}`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to fetch driver routes', err.response?.data?.error);
      console.log(err);
    }),
  generateOTP: () => instance
    .post(`${BASE_URL}/post/generateOTP`)
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to generate OTP', err.response?.data?.error);
      console.log(err);
      return null;
    }),
  verifyOTP: (OTP) => instance
    .post(`${BASE_URL}/post/verifyOTP`, { otp: OTP })
    .then(responseBody)
    .catch((err) => {
      errorNotification('Invalid OTP', err.response?.data?.error);
      console.log(err);
      return null;
    }),
  putDeliveryCompleted: (driverId) => instance
    .post(`${BASE_URL}/post/driver/delivered`, { driver_id: driverId })
    .then(responseBody)
    .catch((err) => {
      errorNotification('Failed to update delivery status', err.response?.data?.error);
      console.log(err);
      return null;
    }),
};

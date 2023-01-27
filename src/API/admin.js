import { BASE_URL, SERVER_ERROR , responseBody } from "API/constants.js"
import axios from "axios";
import { errorNotification } from "components/alerts/Alerts.js";


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    timeoutErrorMessage: SERVER_ERROR,
});

export const AdminAPIs = {
    createAdmin: () => {
        instance
            .post(`http://${BASE_URL}/post/admin/new`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to Create Admin",err.response?.data?.error)
                console.log("error ->",err)
                return null
            })
    },
    // createAdmin: () => {axios({method: 'post', url: 'http://localhost:5050/post/admin/new',})
    //                 .then(function (response) {
    //                     console.log(JSON.stringify(response.data));
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 })
    // },
    getAdminDrivers: (adminId) => {
        instance
            .get(`${BASE_URL}/get/admin/drivers?admin_id=${adminId}`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to fetch driver details",err.response?.data?.error)
                console.log(err)
            })
    },
    getAdminDriverOutput: (adminId) => {
        instance
            .get(`${BASE_URL}/get/admin/output?admin_id=2`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to fetch driver routes",err.response?.data?.error)
                console.log(err);
            })
    },
    postAdminInput: (data) => {
        instance
            .post(`${BASE_URL}/post/admin/dynamicpoint`, data)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Error in posting data",err.response?.data?.error)
                console.log(err)
            })
    },
    postAdminDynamicPoints: () => {

    }
}
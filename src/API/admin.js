import { BASE_URL, SERVER_ERROR , responseBody } from "API/constants.js"
import axios from "axios";
import { errorNotification } from "components/alerts/Alerts.js";
import { showNotification } from "@mantine/notifications";
import CloseIcon from "@mui/icons-material/Close";

const instance = axios.create({
    baseURL: BASE_URL,
});

export const AdminAPIs = {
    createAdmin: () => 
        instance
            .post(`${BASE_URL}/post/admin/new`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to Create Admin",err.response?.data?.error)
                console.log("error ->",err)
                return null
            }),
    getAdmins: () =>
        instance
            .get(`${BASE_URL}/get/admins`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to fetch admins",err.response?.data?.error)
                console.log(err)
            }),
    getAdminDayStarted: () =>
        instance
            .get(`${BASE_URL}/get/admin/dayStarted`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to fetch info on variable adminDayStarted",err.response?.data?.error)
                console.log(err)
            }),
    getAdminDrivers: (adminId) =>
        instance
            .get(`${BASE_URL}/get/admin/drivers?admin_id=${adminId}`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to fetch driver details",err.response?.data?.error)
                console.log(err)
            }),
    getAdminOutput: (adminId) =>
        instance
            .get(`${BASE_URL}/get/admin/output?admin_id=${adminId}`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to fetch admin output",err.response?.data?.error)
                console.log(err);
            }),
    getStartMap: () =>
    instance
        .get(`${BASE_URL}/get/admin/start`)
        .then(responseBody)
        .catch((err) => {
            errorNotification("Failed to fetch driver routes",err.response?.data?.error)
            console.log(err);
        }),
    postAdminInput: (data) =>
        instance
            .post(`${BASE_URL}/post/admin/input`, data)
            .then((res) => {
                console.log(res)
                return res?.data
            })
            .catch((err) => {
                // errorNotification("Error in posting input",err?.message)
                const title = "Error in posting input";
                const message = err?.message;
                showNotification({
                    title,
                    message,
                    color: "red",
                    icon: <CloseIcon />,
                })
                console.log(err)
                return null
            }),
    postAdminStart: (adminId,hubNode) => {
        instance
            .post(`${BASE_URL}/post/admin/start`,{admin_id: adminId, hub_node: hubNode})
            .then((res) => {
                console.log(res.data)
                return res?.data
            })
            .catch((err) => {
                errorNotification("Failed to start admin",err.response?.data?.error)
                console.log(err);
                return null
            })
    },
    putRouteChange: (driverId,data) =>
        instance
            .put(`${BASE_URL}/post/admin/routeChange?driver_id=${driverId}`, data)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to change the route",err.response?.data?.error)
                console.log(err);
                return null
            }),
    // putDeliveryComplete: (driverId,data) => {

    // }
    postAdminDynamicPoints: (driverId,data) => {
        instance
            .post(`${BASE_URL}/post/admin/dynamicPoints?driver_id=${driverId}`, data)
            .then((res) => {
                return res?.data
            })
            .catch((err) => {
                errorNotification("Failed to add new destination",err.response?.data?.error)
                console.log(err);
                return null
            })
    },
    deleteDestination: (driverId,destinationId) => {
        instance
            .delete(`${BASE_URL}/delete/admin/dynamicPoints?driver_id=${driverId}&destination_id=${destinationId}`)
            .then((res) => {
                return res?.data
            })
            .catch((err) => {
                errorNotification("Failed to delete destination",err.response?.data?.error)
                console.log(err);
                return null
            })
    }
}

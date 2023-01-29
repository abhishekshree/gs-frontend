import { BASE_URL, SERVER_ERROR , responseBody } from "API/constants.js"
import axios from "axios";
import { errorNotification } from "components/alerts/Alerts.js";


const instance = axios.create({
    baseURL: BASE_URL,
});

export const DriverAPIs = {
    getDriverRoutes: (driverId) =>
        instance
            .get(`${BASE_URL}/get/driver/routes?driver_id=${driverId}`)
            .then(responseBody)
            .catch((err) => {
                errorNotification("Failed to fetch driver routes",err.response?.data?.error)
                console.log(err);
            }),
}

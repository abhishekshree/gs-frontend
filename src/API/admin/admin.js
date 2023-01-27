import { BASE_URL, SERVER_ERROR , responseBody } from "API/constants.js"
import axios from "axios";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    timeoutErrorMessage: SERVER_ERROR,
});

export const AdminAPIs = {
    createAdmin: () => {
        instance
            .post()
    },
    getAdminDrivers: (adminId) => {
        instance
            .get(`${BASE_URL}/get/admin/drivers?admin_id=${adminId}`)
            .then(responseBody)
            .catch((err) => {
                console.log(err)
            })
    },
    getAdminDriverOutput: (adminId) => {
        instance
            .get(`${BASE_URL}/get/admin/output?admin_id=${adminId}`)
            .then(responseBody)
            .catch((err) => {
                console.log(err)
            })
    },
    postAdminInput: (data) => {
        instance
            .post(`${BASE_URL}/post/admin/dynamicpoint`, data)
            .then(responseBody)
            .catch((err) => {
                console.log(err)
            })
    },
    postAdminDynamicPoints: () => {

    }
}

export async function createAdmin(){
    fetch(`${BASE_URL}/post/admin/new`)
    .then()
}

export async function getAllAdmins(){

}

export async function getAllDrivers(){

}

export async function getAdminDrivers(){

}

export async function getAdminDriverOutput(adminId){
    const response = await fetch(`${BASE_URL}/get/admin/dynamicpoints?admin_id=${adminId}`)
}
import { BASE_URL } from "API/constants.js"

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
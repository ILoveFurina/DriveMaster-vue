import axios from "axios"
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function login(username, password) {
    try {
        const response = await AxiosInstance.post("admin/user/login", {
            username,
            password
        })

        console.log(response)
        if (response.code === 200) {
            message.success(response.msg, 3);
            return true
        }
        if (response.code === 500) {
            message.error(response.msg, 3);
            return false
        }
    } catch (error) {
        console.log(error)
    }
}


import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function getUser(username) {
    try {
        const response = await AxiosInstance.get("admin/user", {params: {username}})
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

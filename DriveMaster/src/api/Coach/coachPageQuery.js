import axios from "axios"
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function coachPageQuery(coachPageQueryDTO) {
    try {
        const response = await AxiosInstance.get("admin/coach/page",{
            params: coachPageQueryDTO
        })

        console.log(response)

        if (response.code === 200) {
            return response
        }
        if (response.code === 500) {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

import axios from "axios"
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";
import moment from "moment/moment.js";

export async function coachPageQuery(coachPageQueryDTO) {
    try {
        const response = await AxiosInstance.get("admin/coach/page",{
            params: coachPageQueryDTO
        })

        for(let i = 0;i<response.data.records.length;i++){
            response.data.records[i].createTime = moment(response.data.records[i].createTime).format("YYYY-MM-DD HH:mm:ss")
        }

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

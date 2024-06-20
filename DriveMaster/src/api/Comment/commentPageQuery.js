import axios from "axios"
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";
import moment from "moment/moment.js";

export async function commentPageQuery(commentPageQueryDTO) {
    try {
        const response = await AxiosInstance.get("admin/comment/page",{
            params: commentPageQueryDTO
        })

        for(let i = 0;i<response.data.records.length;i++){
            response.data.records[i].createTime = moment(response.data.records[i].createTime).format("YYYY-MM-DD HH:mm:ss")
        }

        console.log(response)

        if (response.code === 200) {
            return response
        }else{
            message.error(response.msg)
        }

    } catch (error) {
        console.log(error)
    }
}

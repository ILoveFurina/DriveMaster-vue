import axios from "axios"
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function commentPageQuery({page=1,pageSize=10}) {
    try {
        const response = await AxiosInstance.get("admin/comment/page",{
            params: commentPageQueryDTO
        })

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

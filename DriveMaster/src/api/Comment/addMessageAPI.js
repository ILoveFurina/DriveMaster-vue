
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function addMessageAPI(commentDTO) {
    try {
        const response = await AxiosInstance.post("admin/comment",commentDTO)
        console.log(response)

        if (response.code === 200) {
            message.success("添加成功")
        }
        else {
            message.error("添加失败")
        }
        return response
    } catch (error) {
        console.log(error)
    }
}

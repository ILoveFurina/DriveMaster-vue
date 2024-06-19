
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function updateGraduation(graduationDTO) {
    try {
        const response = await AxiosInstance.put("admin/graduation",graduationDTO)
        console.log(response)

        if (response.code === 200) {
            message.success("更新成功")
        }
        if (response.code === 500) {
            message.error("更新失败")
        }

    } catch (error) {
        message.error("更新失败")
        console.log(error)
    }
}

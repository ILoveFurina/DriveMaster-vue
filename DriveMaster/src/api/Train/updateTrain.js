
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function updateTrain(trainDTO) {
    try {
        const response = await AxiosInstance.put("admin/train",trainDTO)
        console.log(response)

        if (response.code === 200) {
            message.success("更新成功")
        }
        if (response.code === 500) {
            message.error("更新失败")
        }

    } catch (error) {
        console.log(error)
    }
}

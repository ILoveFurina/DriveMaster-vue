import AxiosInstance from "@/utils/http.js";
import { message } from "ant-design-vue";

export async function addGraduation(id) {
    try {
        // 动态插入id到URL路径中
        const response = await AxiosInstance.post(`admin/graduation/${id}`);

        console.log(response);

        if (response.code === 200) {
            message.success("添加成功");
        } else {
            message.error("添加失败");
        }

        return response;
    } catch (error) {
        message.error("添加失败");
        console.log(error);
        throw error; // 可选择抛出错误，以便调用者可以进一步处理
    }
}

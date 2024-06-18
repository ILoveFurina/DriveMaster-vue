
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function deleteCoach(id) {
    try {
        const response = await AxiosInstance.delete("/admin/coach",{
            params: {
                id,
            }
        })
        console.log(response)

        if (response.code === 200) {
            message.success("删除成功")
        }
        if (response.code === 500) {
            message.error("删除失败")
        }
    } catch (error) {
        console.log(error)
    }
}

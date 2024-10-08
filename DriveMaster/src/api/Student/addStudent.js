
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function addStudent(studentDTO) {
    try {
        const response = await AxiosInstance.post("admin/student",studentDTO)
        console.log(response)

        if (response.code === 200) {
            message.success("添加成功")
        }
        else {
            message.error("添加失败")
        }

    } catch (error) {
        message.error("添加失败")
        console.log(error)
    }
}

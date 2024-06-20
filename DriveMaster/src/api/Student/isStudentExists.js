
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function isStudentExists(studentId) {
    try {
        const response = await AxiosInstance.get("admin/student",{
            params:{
                studentId:studentId
            }
        })
        console.log(response)

        if (response.code === 200) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        message.error("添加失败")
        console.log(error)
    }
}

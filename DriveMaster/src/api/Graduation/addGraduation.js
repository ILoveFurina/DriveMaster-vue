import AxiosInstance from "@/utils/http.js";
import { message } from "ant-design-vue";

export async function addGraduation(id) {
    try {

        const response = await AxiosInstance.post(`admin/graduation/${id}`);
        console.log(response);
        if(response.code === 200){
            message.success("添加成功",1);
        }else{
            message.error(response.msg,1);
        }
        return response;
    } catch (error) {
        message.error(error.message);
    }
}

import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

export async function register(LoginDTO) {
    const router = useRouter();
    try {
        const response = await AxiosInstance.post("admin/user/register", LoginDTO)
        console.log(response)
        if (response.code === 200) {
            message.success(response.msg, 3);
        } else if (response.code === 500) {
            message.error(response.msg, 3);
        }
    } catch (error) {
        console.log(error)
    }


}

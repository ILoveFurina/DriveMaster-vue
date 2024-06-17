import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

export function register(LoginDTO){
    const router = useRouter();
    AxiosInstance.post("admin/user/register",LoginDTO).then((response) => {
        console.log(response)
        if(response.code === 200){
            message.success(response.msg, 3);
            router.replace("login");
        }else if(response.code === 500){
            message.error(response.msg, 3);
        }
    })
}


import AxiosInstance from "@/utils/http.js";
import {useRouter} from "vue-router";

const router = useRouter();
export async function logout() {
    try{
        const response =  await AxiosInstance.get("admin/user/logout")
        console.log(response)
        return response
    } catch(error){
        console.log(error);
    }

    return false;
}

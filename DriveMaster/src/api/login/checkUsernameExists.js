
import AxiosInstance from "@/utils/http.js";
export async function checkUsernameExists(username) {
    try{
        const response =  await AxiosInstance.get("admin/user/usernameExists", {params:{username}})
        console.log(response)
        return response
    } catch(error){
        console.log(error);
    }
}

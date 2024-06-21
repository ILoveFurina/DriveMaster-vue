
import AxiosInstance from "@/utils/http.js";
export async function checkUserExists(user) {
    try{
        const response = await AxiosInstance.get("admin/user/userExists", {params: {user}})

        console.log(response)
        return response
    } catch(error){
        console.log(error);
    }
}

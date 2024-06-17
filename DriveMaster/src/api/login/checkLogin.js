import AxiosInstance from "@/utils/http.js";
export async function checkLogin() {
    try{
        const response =  await AxiosInstance.get("admin/user/isLogin")
        console.log(response)
        if (response.code === 200) {
            console.log(response.data.status)
            return response.data.status === true;
        }
    } catch(error){
        console.log(error);
    }

    return false;
}

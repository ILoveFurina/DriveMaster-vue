import axios from "axios"
import AxiosInstance from "@/utils/http.js";
function checkLogin(){

    AxiosInstance.get("admin/isLogin").then((response) => {
        console.log(response)
    }).catch((error)=>{
        console.log(error);
    })
}

export {checkLogin}

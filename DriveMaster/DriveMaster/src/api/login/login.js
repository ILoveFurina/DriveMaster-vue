import axios from "axios"
import AxiosInstance from "@/utils/http.js";

function login(username,password){

     AxiosInstance.get("/admin/login",{
        params:{
            username,
            password
        },
    }).then((response) => {

        console.log(response)
        if(response.status === 200){
            return 1;
        }else {
            return 0;
        }

    }).catch((error)=>{
        console.log(error);
        return 0;
    })

    return 0;
}

export {login}

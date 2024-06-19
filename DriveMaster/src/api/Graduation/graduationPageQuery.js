
import AxiosInstance from "@/utils/http.js";
import moment from "moment/moment.js";

export async function graduationPageQuery(graduationPageQueryDTO) {
    try {
        const response = await AxiosInstance.get("admin/graduation/page",{
            params: graduationPageQueryDTO
        })
        for(let i = 0;i<response.data.records.length;i++){
            response.data.records[i].graduateTime = moment(response.data.records[i].graduateTime).format("YYYY-MM-DD HH:mm:ss")
        }
        console.log(response)

        return response

    } catch (error) {
        console.log(error)
    }
}

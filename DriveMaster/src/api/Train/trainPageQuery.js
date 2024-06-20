
import AxiosInstance from "@/utils/http.js";
import moment from "moment";

export async function trainPageQuery(trainPageQueryDTO) {
    try {
        const response = await AxiosInstance.get("admin/train/page",{
            params: trainPageQueryDTO
        })

        for(let i = 0;i<response.data.records.length;i++){
            response.data.records[i].trainDate = moment(response.data.records[i].trainDate).format("YYYY-MM-DD HH:mm:ss")
        }

        console.log(response)

        if (response.code === 200) {
            return response
        }
        if (response.code === 500) {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

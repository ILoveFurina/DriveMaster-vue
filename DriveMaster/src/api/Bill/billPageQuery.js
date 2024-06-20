
import AxiosInstance from "@/utils/http.js";
import moment from "moment";

export async function billPageQuery(billPageQueryDTO) {
    try {
        const response = await AxiosInstance.get("admin/bill/page",{
            params: billPageQueryDTO
        })

        for(let i = 0;i<response.data.records.length;i++){
            response.data.records[i].billDate = moment(response.data.records[i].billDate).format("YYYY-MM-DD HH:mm:ss")
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

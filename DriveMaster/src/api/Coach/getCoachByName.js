
import AxiosInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

export async function getCoachByName(coachName) {
    try {
        const response = await AxiosInstance.get("admin/coach", {params: {coachName: coachName}})
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}

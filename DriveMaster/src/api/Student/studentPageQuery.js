
import AxiosInstance from "@/utils/http.js";

export async function studentPageQuery(studentPageQueryDTO) {
    try {
        const response = await AxiosInstance.get("admin/student/page",{
            params: studentPageQueryDTO
        })

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

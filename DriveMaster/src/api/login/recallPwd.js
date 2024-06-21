import AxiosInstance from "@/utils/http.js";

export async function recallPwd(RecallPwdDTO) {
    try {
        const response = await AxiosInstance.put("admin/user/recall",
            RecallPwdDTO
        )

        console.log(response)

        return response

    } catch (error) {
        console.log(error)
    }
}

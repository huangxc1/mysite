import axios from "axios";
import { showMessage } from "@/utils/showMessage";


const request = axios.create({
    //baseURL:"http://localhost:7001",
    timeout: 5000,
});





// 添加响应拦截器
request.interceptors.response.use(function (response) {
    if (response.data.code !== 0) {
        showMessage({
            type: "error",
            text: response.data.message,
            duration: "2000"
        })
        return null
    }
    // showMessage({
    //     type: "success",
    //     text: "获取数据成功",
    //     duration: "2000"
    // })
    return response.data;
});

export default request
import request from "./request";

export async function getBanner() {
    const result = await request.get("/api/banner")
    return result
}

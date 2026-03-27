import request from "./request";


export async function getBlogType() {
    const result = await request.get("/api/blogtype")
    return result
}

export async function getBlogList(page = 1, limit = 10, categoryid = -1, keyword = "") {
    const result = await request.get("/api/blog", {
        params: {
            page,
            limit,
            categoryid,
            keyword
        }
    })
    return result
}


export async function getBlogById(id) {
    const result = await request.get(`/api/blog/${id}`)
    return result
}


export async function postComment(commentInfo) {
    return await request.post(`/api/comment`, commentInfo);
}

export async function getComments(blogid, page = 1, limit = 10) {
    return await request.get("/api/comment", {
        params: {
            blogid,
            page,
            limit,
        },
    });
}

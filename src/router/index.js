import Vue from "vue"
import VueRouter from "vue-router"
import titleController from "../utils/titleController"
import NotFond from "@/components/NotFond"
import "nprogress/nprogress.css"
import { start, done, configure } from "nprogress"

Vue.use(VueRouter)
configure({
    trickleSpeed: 20,
    showSpinner: false,
})

const asyncCompProgress = function (callback) {
    return async () => {
        start()
        const comp = await callback()
        done()
        return comp
    }
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            name: "Home", path: "/", component: asyncCompProgress(() => import(/* webpackChunkName: "home" */"@/views/Home")),
            meta: {
                title: "首页"
            }
        },
        {
            name: "About", path: "/about", component: () => import(/* webpackChunkName: "about" */"@/views/About"),
            meta: {
                title: "关于我"
            }
        },
        {
            name: "Blog", path: "/article",
            component: asyncCompProgress(() => import(/* webpackChunkName: "blog" */"@/views/Blog")),
            meta: {
                title: "文章"
            }
        },
        {
            name: "CategoryBlog", path: "/article/cate/:id", component: asyncCompProgress(() => import(/* webpackChunkName: "blog" */"@/views/Blog")), meta: {
                title: "分类文章"
            }
        },
        {
            name: "DetailBlog", path: "/article/detail/:id", component: () => import(/* webpackChunkName: "detail" */"@/views/Blog/Detail"), meta: {
                title: "文章详情"
            }
        },
        {
            name: "Message", path: "/message", component: () => import(/* webpackChunkName: "message" */"@/views/Message"), meta: {
                title: "留言板"
            }
        },
        {
            name: "Project", path: "/project", component: () => import(/* webpackChunkName: "project" */"@/views/Project"), meta: {
                title: "项目"
            }
        },
        {
            name: "NotFond", path: "*", component: NotFond,
        }
    ]
})

router.afterEach((to, from) => {
    if (to.meta.title) {
        titleController.setRouteTitle(to.meta.title);
    }
})


export default router
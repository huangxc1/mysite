import style from "@/utils/message.module.less"
import getComponentRootDom from "./getComponentRootDom"
import Icon from "@/components/Icon/index.vue"
/**
 * @param {string} text 提示消息
 * @param {string} type 消息类型 info error warn
 * @param {*} container dom对象  要放在哪个容器的中间
 * @param {*} duration 持续时间
 * @param {Function} callback 执行一段代码
 */
export function showMessage(option = {}, callback) {
    const text = option.text || ""
    const type = option.type || "info"
    const container = option.container || document.body
    const duration = option.duration || 2000

    const div = document.createElement("div")
    //拿到组件根dom对象                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    const icon = getComponentRootDom(Icon, { type })
    //outerHTML可以将dom对象转换成html字符串
    div.innerHTML = `<span class="${style.icon}">${icon.outerHTML}</span><span>${text}</span>`
    if (getComputedStyle(container).position === "static") {
        container.style.position = "relative"
    }
    div.className = `${style.message}  ${style[`message-${type}`]} `
    container.append(div)
    //强行渲染一次 
    div.clientHeight
    //回归正常位置
    div.style.transform = `translate(-50%,-50%)`
    div.style.opacity = 1

    setTimeout(() => {
        div.style.transform = `translate(-50%,-50%) translateY(-35px)`
        div.style.opacity = 0
        div.addEventListener("transitionend", function () {
            div.remove()
            callback && callback()
        }, { once: true })
    }, duration)
}
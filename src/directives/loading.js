import imgUrl from "@/assets/loading.svg"
import styles from "./loading.module.less"
export default {
    bind(el,binding) {
        //判断binding.value来决定是否添加或删除img
        if (binding.value) {
            //判断有没有img元素 没有就创建img元素
            if (!getImgDOM(el)) {
                creatImg(el)
            }
        } 
    },
    //对于组件内多次数据跟新 这个update该怎么写
    update(el, binding) {
        //判断binding.value来决定是否添加或删除img
        if (binding.value) {
            //判断有没有img元素 没有就创建img元素
            if (!getImgDOM(el)) {
                creatImg(el)
            }
        } else {
            //判断有无img 删除img元素
            if (getImgDOM(el)) {
                getImgDOM(el).remove()
            }
        }
    },
}


function getImgDOM(el) {
   return el.querySelector("img[data-load=loading]")
}

function creatImg(el) {
    const img = document.createElement("img")
    img.dataset.load = "loading"
    img.src = imgUrl
    img.classList.add(styles.load)
    el.append(img)
    return img
}